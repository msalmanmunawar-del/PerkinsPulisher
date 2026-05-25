import { useState } from 'react';
import { BOOKS } from '../data';
import { Book } from '../types';
import { Star, Eye, X, ChevronLeft, ChevronRight, BookOpen, Search, ZoomIn, Type } from 'lucide-react';

interface BookSliderProps {
  onOpenConsultation: () => void;
}

export default function BookSlider({ onOpenConsultation }: BookSliderProps) {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  const filteredBooks = BOOKS.filter((book) => {
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const genres = [
    { label: 'All Bestsellers', id: 'all' },
    { label: 'Fiction', id: 'fiction' },
    { label: 'Non-Fiction / business', id: 'nonfiction' },
    { label: 'Sci-Fi / Fantasy', id: 'scifi' },
    { label: 'Memoir / Biography', id: 'memoir' }
  ];

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-black text-amber-600 uppercase tracking-widest bg-amber-500/10 px-3 py-1.5 rounded-full inline-block">
            FEATURED PORTFOLIO SHELF
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Our Elite Bestseller Gallery
          </h2>
          <p className="text-sm text-gray-500 font-bold">
            Explore masterpieces written, formatted, illustrated, or distributed by Perkins Publisher. Click on any book cover to browse Chapter 1 instantly in our cozy reader portal.
          </p>
        </div>

        {/* Filter and Search Bar Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white p-4 rounded-2xl border border-gray-150 shadow-sm">
          <div className="flex flex-wrap gap-1.5 justify-center md:justify-start w-full md:w-auto">
            {genres.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGenre(g.id)}
                className={`text-xs font-bold px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                  selectedGenre === g.id
                    ? 'bg-blue-900 text-amber-400'
                    : 'bg-gray-100 hover:bg-gray-150 text-gray-600'
                }`}
              >
                {g.label.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search books or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Books Shelf Grid Layout */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No matching books discovered in our vault</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="group flex flex-col justify-between"
              >
                {/* 3D Visual Book Mockup Spine Effect */}
                <div
                  onClick={() => setActiveBook(book)}
                  className="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-md group-hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer bg-slate-900 border border-black/10 flex flex-col justify-between p-4 bg-cover text-white"
                >
                  {/* Spine simulated lighting */}
                  <div className="absolute top-0 left-0 w-3 h-full bg-gradient-to-r from-black/40 via-white/10 to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute top-0 left-3 w-px h-full bg-black/20 z-10 pointer-events-none"></div>

                  <div className={`absolute inset-0 bg-gradient-to-br ${book.coverGradient} ${book.coverPattern} opacity-95 group-hover:opacity-100 transition-opacity`}></div>

                  {/* Book Metadata contents */}
                  <div className="relative z-20 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      {book.badge && (
                        <span className="bg-amber-500 text-[8px] font-black text-blue-950 px-1.5 py-0.5 rounded tracking-widest block uppercase w-fit">
                          {book.badge}
                        </span>
                      )}
                      
                      <h4 className="text-sm sm:text-base font-black font-serif tracking-tight mt-3 leading-tight line-clamp-3">
                        {book.title}
                      </h4>
                      <p className="text-[10px] text-amber-400 font-bold tracking-wider mt-1">
                        By {book.author}
                      </p>
                    </div>

                    <div className="flex justify-between items-center border-t border-white/10 pt-3">
                      <span className="text-[9px] uppercase font-black text-gray-300 tracking-widest">
                        {book.genre}
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-400 font-extrabold text-[10px]">
                        <Star size={10} className="fill-amber-400" />
                        <span>{book.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Quick Read trigger overlay */}
                  <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-white text-blue-950 text-[10px] font-black uppercase px-3 py-2 rounded-lg shadow-lg flex items-center gap-1.5">
                      <Eye size={12} />
                      <span>Read Chapter One</span>
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-center md:text-left">
                  <h4 className="text-xs font-black text-blue-950 truncate">{book.title}</h4>
                  <p className="text-[10px] text-gray-500 font-bold truncate">by {book.author}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Natural High-Attention CTA Banner */}
        <div className="mt-16 bg-amber-50 relative border border-amber-500/10 rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest inline-block">
              GET PUBLISHED LIKE A PRO
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-blue-950">
              Is Your Draft Ready for the Global Bestseller Shelf?
            </h3>
            <p className="text-xs sm:text-sm text-gray-655 font-semibold max-w-2xl leading-relaxed">
              Whether you need elite typesetting, professional developmental editing, or high-profile Times Square trailer coordination — let's review your manuscript.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="shrink-0 w-full md:w-auto bg-blue-900 hover:bg-blue-950 text-white font-black text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-center animate-pulse"
          >
            Request Free Manuscript Review
          </button>
        </div>

      </div>

      {/* Chapter 1 Split-Screen Cozy Reader Simul Modal */}
      {activeBook && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-4xl bg-[#fbfaf5] rounded-3xl overflow-hidden shadow-4xl text-gray-900 border border-amber-900/15 flex flex-col md:grid md:grid-cols-12 min-h-[500px] max-h-[90vh]">
            
            {/* Split Left Column: Book Detail panel inside dark mode */}
            <div className="md:col-span-4 bg-slate-950 text-white p-6 sm:p-8 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-slate-800">
              
              {/* Floating absolute pattern */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-950 to-slate-900 opacity-95"></div>
              
              <button
                onClick={() => setActiveBook(null)}
                className="absolute top-4 left-4 bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-full z-20 cursor-pointer block md:hidden"
              >
                <X size={16} />
              </button>

              <div className="relative z-10 space-y-6">
                <span className="bg-amber-500 text-blue-950 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest w-fit block">
                  {activeBook.badge || 'BESTSELLER'}
                </span>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black font-serif leading-tight">{activeBook.title}</h3>
                  <p className="text-sm text-amber-400 font-bold">Authorized Author: {activeBook.author}</p>
                </div>

                <div className="text-xs text-slate-400 leading-relaxed font-semibold">
                  <h4 className="text-[10px] uppercase font-bold text-white tracking-widest mb-1.5">SYNOPSIS</h4>
                  <p className="line-clamp-6">{activeBook.synopsis}</p>
                </div>
              </div>

              {/* Verified badge */}
              <div className="relative z-10 pt-4 border-t border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-500">
                  <BookOpen size={14} />
                  <span>Interactive Reader Portal</span>
                </div>
                <p className="text-[10px] text-slate-500">
                  Formatted meticulously following Amazon and Barnes & Noble standards by Perkins Publisher.
                </p>
              </div>

            </div>

            {/* Split Right Column: Lined Paper eBook Text Reader */}
            <div className="md:col-span-8 p-6 sm:p-10 flex flex-col justify-between max-h-[100%] overflow-hidden relative">
              
              {/* Close Button top-right */}
              <button
                onClick={() => setActiveBook(null)}
                className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-slate-700 p-2 rounded-full z-20 cursor-pointer hidden md:block"
                aria-label="Close Reader"
              >
                <X size={16} />
              </button>

              {/* Reader Control Preferences */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">CHAPTER ONE PREVIEW</span>
                
                {/* Font Size Selector preference */}
                <div className="flex items-center gap-1.5">
                  <Type size={13} className="text-gray-400" />
                  {(['sm', 'base', 'lg'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setFontSize(sz)}
                      className={`text-xs font-extrabold px-2 py-0.5 rounded ${
                        fontSize === sz
                          ? 'bg-blue-900 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {sz.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chapter narrative box */}
              <div className="flex-1 overflow-y-auto pr-4 space-y-4 font-serif">
                {activeBook.firstChapter.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className={`leading-relaxed text-[#2c2620] indent-4 ${
                      fontSize === 'sm' ? 'text-xs font-medium' :
                      fontSize === 'lg' ? 'text-lg font-bold' : 'text-sm font-semibold'
                    } ${pIdx === 0 ? 'text-center font-black uppercase tracking-wider text-blue-950 font-sans p-2 bg-amber-50 rounded border border-amber-900/10 mb-6' : ''}`}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Promotional footnote inside Reader */}
              <div className="pt-6 border-t border-gray-200 mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                <div>
                  <h4 className="text-xs font-extrabold text-blue-950">INSPIRED BY THIS LEVEL OF CRAFTMANSHIP?</h4>
                  <p className="text-[10px] text-gray-500 font-bold">Our layout and editing formats are fully approved for Apple Books iPad layout standards.</p>
                </div>
                <button
                  onClick={() => {
                    setActiveBook(null);
                    onOpenConsultation();
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-blue-950 text-[10px] font-black uppercase px-4 py-2.5 rounded-lg shadow-md transition-all whitespace-nowrap cursor-pointer"
                >
                  Request Consultation For My Book
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
