import { useMemo, useState } from 'react'
import { Search, Filter, Star } from 'lucide-react'

const TEMPLATES = [
  {
    id: 'saas-landing',
    name: 'SaaS Landing',
    industry: 'Software',
    features: ['Hero', 'Pricing', 'Testimonials'],
    rating: 4.8,
    code: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>SaaS Landing</title><style>body{font-family:Inter,system-ui,Arial;margin:0;background:#0b1220;color:#e6eefc}.wrap{max-width:1040px;margin:56px auto;padding:0 16px}.cta{background:#2563eb;color:#fff;border:none;border-radius:12px;padding:12px 18px}</style></head><body><div class="wrap"><h1 style="font-size:54px;line-height:1.05;margin:0 0 8px">Launch faster with Bolt Lovable</h1><p style="opacity:.9;max-width:60ch">Beautiful templates, multi-AI orchestration, and one‑click deploy to Vercel or Netlify.</p><div style="margin-top:16px"><button class="cta">Get Started</button></div></div></body></html>`
  },
  {
    id: 'portfolio-modern',
    name: 'Modern Portfolio',
    industry: 'Creative',
    features: ['Gallery', 'About', 'Contact'],
    rating: 4.6,
    code: `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Portfolio</title><style>body{font-family:Inter,system-ui;margin:0;background:#f8fafc;color:#0b1220}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}</style></head><body><main style="max-width:980px;margin:56px auto;padding:0 16px"><h1 style="font-size:42px;margin:0 0 8px">Hi, I’m Alex</h1><p>Designer & developer crafting delightful products.</p><div class="grid"><div style="background:#e2e8f0;height:120px;border-radius:12px"></div><div style="background:#e2e8f0;height:120px;border-radius:12px"></div><div style="background:#e2e8f0;height:120px;border-radius:12px"></div></div></main></body></html>`
  },
  {
    id: 'ecommerce-minimal',
    name: 'Minimal eCommerce',
    industry: 'Retail',
    features: ['Grid', 'Cart', 'Checkout'],
    rating: 4.7,
    code: `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Store</title><style>body{font-family:Inter,system-ui;margin:0;background:#ffffff;color:#0b1220}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}</style></head><body><main style="max-width:1100px;margin:56px auto;padding:0 16px"><header style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px"><strong>Shop</strong><button style="border-radius:12px;border:1px solid #d1d5db;padding:8px 12px">Cart (0)</button></header><div class="grid"><div style="background:#f3f4f6;height:160px;border-radius:12px"></div><div style="background:#f3f4f6;height:160px;border-radius:12px"></div><div style="background:#f3f4f6;height:160px;border-radius:12px"></div><div style="background:#f3f4f6;height:160px;border-radius:12px"></div></div></main></body></html>`
  }
]

export default function TemplateLibrary({ onApplyTemplate }) {
  const [q, setQ] = useState('')
  const [industry, setIndustry] = useState('All')
  const [feature, setFeature] = useState('All')

  const industries = useMemo(() => ['All', ...Array.from(new Set(TEMPLATES.map(t => t.industry)))], [])
  const features = useMemo(() => ['All', ...Array.from(new Set(TEMPLATES.flatMap(t => t.features)))], [])

  const filtered = useMemo(() => {
    return TEMPLATES.filter(t => {
      const matchesQ = q.trim() === '' || t.name.toLowerCase().includes(q.toLowerCase())
      const matchesIndustry = industry === 'All' || t.industry === industry
      const matchesFeature = feature === 'All' || t.features.includes(feature)
      return matchesQ && matchesIndustry && matchesFeature
    })
  }, [q, industry, feature])

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search templates" className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-200" />
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="text-sm px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {industries.map(v => <option key={v}>{v}</option>)}
          </select>
          <select value={feature} onChange={(e) => setFeature(e.target.value)} className="text-sm px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {features.map(v => <option key={v}>{v}</option>)}
          </select>
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map(t => (
          <li key={t.id} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 overflow-hidden">
            <div className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.industry} • {t.features.join(', ')}</div>
                </div>
                <div className="inline-flex items-center gap-1 text-amber-500 text-sm" aria-label={`Rating ${t.rating}`}>
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                  {t.rating}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button onClick={() => onApplyTemplate && onApplyTemplate(t)} className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Use Template</button>
                <a href={`data:text/html;charset=utf-8,${encodeURIComponent(t.code)}`} download={`${t.id}.html`} className="inline-flex items-center justify-center px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">Download</a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
