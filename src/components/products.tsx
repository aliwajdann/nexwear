'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import ProductCard from './ProductCard';
import useProducts from '@/hooks/useProducts';

// Same side padding as the card's `px-2` info inset on mobile, so everything lines up
const PAD = 'px-2 md:px-8';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

const tagLabel = (t: string) => {
  if (t === 'onsale') return 'On Sale';
  return t.charAt(0).toUpperCase() + t.slice(1);
};

const chip = (active: boolean) =>
  `px-3 py-1.5 rounded-full border text-[13px] transition ${active
    ? 'bg-black text-white border-black'
    : 'bg-white text-gray-800 border-gray-300 hover:border-black'
  }`;

const pill = (open: boolean) =>
  `flex items-center gap-1.5 rounded-full border px-3 md:px-4 py-1.5 md:py-2 text-[13px] md:text-[14px] text-black transition ${open ? 'border-black' : 'border-gray-300 hover:border-black'
  }`;

export default function ProductsSection() {
  const { products, loading } = useProducts();

  const [openMenu, setOpenMenu] = useState<'filters' | 'sort' | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSubs, setSelectedSubs] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const barRef = useRef<HTMLDivElement>(null);

  // Close any dropdown on outside click / Escape
  useEffect(() => {
    if (!openMenu) return;

    const onDown = (e: MouseEvent | TouchEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };

    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openMenu]);

  const list: any[] = products || [];

  const allTags = useMemo(
    () => Array.from(new Set(list.flatMap((p) => p.tags || []))) as string[],
    [list]
  );

  const allSubs = useMemo(() => {
    const map = new Map<string, string>();
    list.forEach((p) => {
      if (p.subcategory?.slug) map.set(p.subcategory.slug, p.subcategory.name);
    });
    return Array.from(map, ([slug, name]) => ({ slug, name }));
  }, [list]);

  const filtered = useMemo(() => {
    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;

    let result = list.filter((p) => {
      if (selectedTags.length && !selectedTags.some((t) => p.tags?.includes(t))) return false;
      if (selectedSubs.length && !selectedSubs.includes(p.subcategory?.slug)) return false;
      if (min !== null && p.price < min) return false;
      if (max !== null && p.price > max) return false;
      return true;
    });

    if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [list, selectedTags, selectedSubs, minPrice, maxPrice, sortBy]);

  const toggle = (arr: string[], setArr: (v: string[]) => void, value: string) =>
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);

  const activeCount =
    selectedTags.length + selectedSubs.length + (minPrice || maxPrice ? 1 : 0);

  const clearAll = () => {
    setSelectedTags([]);
    setSelectedSubs([]);
    setMinPrice('');
    setMaxPrice('');
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Loading products...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen pb-12">
      {/* Toolbar: title left, filters + sort right.
          Not sticky on purpose, so it can never show through or peek out from the header. */}
      <div ref={barRef} className={`relative z-20 ${PAD}`}>
        <div className="flex items-center justify-between gap-3 py-4">
          <h1 className="text-[20px] md:text-[28px] font-medium text-black">
            All Products
          </h1>

          <div className="flex items-center gap-2">
            {/* Filters button */}
            <button
              onClick={() => setOpenMenu((m) => (m === 'filters' ? null : 'filters'))}
              aria-expanded={openMenu === 'filters'}
              className={pill(openMenu === 'filters')}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeCount > 0 && (
                <span className="bg-black text-white text-[11px] rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">
                  {activeCount}
                </span>
              )}
            </button>

            {/* Sort button + menu */}
            <div className="relative">
              <button
                onClick={() => setOpenMenu((m) => (m === 'sort' ? null : 'sort'))}
                aria-expanded={openMenu === 'sort'}
                className={pill(openMenu === 'sort')}
              >
                Sort
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${openMenu === 'sort' ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {openMenu === 'sort' && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30">
                  {sortOptions.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => {
                        setSortBy(o.value);
                        setOpenMenu(null);
                      }}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-[14px] text-left hover:bg-gray-50"
                    >
                      <span className={sortBy === o.value ? 'font-medium' : ''}>
                        {o.label}
                      </span>
                      {sortBy === o.value && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filters dropdown: full width on mobile, small card under the button on desktop */}
        {openMenu === 'filters' && (
          <div className="absolute top-full inset-x-0 md:inset-x-auto md:right-8 md:w-[380px] bg-white border-y md:border md:rounded-lg border-gray-200 shadow-lg flex flex-col max-h-[70vh]">
            <div className="overflow-y-auto p-4 space-y-5">
              {allTags.length > 0 && (
                <div>
                  <p className="text-[14px] font-medium mb-2">Offers</p>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggle(selectedTags, setSelectedTags, tag)}
                        className={chip(selectedTags.includes(tag))}
                      >
                        {tagLabel(tag)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {allSubs.length > 0 && (
                <div>
                  <p className="text-[14px] font-medium mb-2">Type</p>
                  <div className="flex flex-wrap gap-2">
                    {allSubs.map((s) => (
                      <button
                        key={s.slug}
                        onClick={() => toggle(selectedSubs, setSelectedSubs, s.slug)}
                        className={chip(selectedSubs.includes(s.slug))}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-[14px] font-medium mb-2">Price (Rs.)</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none focus:border-black"
                  />
                  <span className="text-gray-400">–</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[14px] outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-gray-100 p-4">
              <button
                onClick={clearAll}
                disabled={activeCount === 0}
                className="text-[14px] underline text-black disabled:opacity-30 disabled:no-underline"
              >
                Clear all
              </button>
              <button
                onClick={() => setOpenMenu(null)}
                className="bg-black text-white rounded-full px-6 py-2.5 text-[14px]"
              >
                Show {filtered.length} results
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Product grid: no side padding on mobile so images touch the edges.
          relative z-0 keeps card overlays (like the add to cart button) below the header. */}
      <div className="relative z-0 md:px-8">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-gray-600">
            <p>No products match your filters.</p>
            <button onClick={clearAll} className="mt-3 underline text-black text-sm">
              Clear all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-8 md:gap-x-3 md:gap-y-10">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                edgeToEdge
                product={{
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  originalprice: product.originalPrice,
                  images: product.media || [],
                  href: `/products/${product.id}`,
                  description: product.description,
                  category: product.category,
                  subcategory: product.subcategory,
                  tags: product.tags,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}