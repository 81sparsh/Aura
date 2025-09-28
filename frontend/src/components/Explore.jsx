import React, { useEffect, useState } from 'react';

const fetchNekos = async (count = 9) => {
  const res = await fetch(`https://nekos.best/api/v2/neko?amount=${count}`);
  const data = await res.json();
  return data.results || [];
};

const Explore = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  // Initial load
  useEffect(() => {
    loadNekos(12);
    // eslint-disable-next-line
  }, []);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !loading
      ) {
        loadNekos(9);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line
  }, [loading, images]);

  const loadNekos = async (count) => {
    setLoading(true);
    try {
      const newImages = await fetchNekos(count);
      setImages(prev => [...prev, ...newImages]);
    } catch (err) {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#fafafa] min-h-screen">
      <h1 className="text-2xl font-bold my-4">Enjoy the Beauty</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl px-4">
        {images.map((item, idx) => (
          <div
            key={item.url + idx}
            className="rounded-lg overflow-hidden shadow bg-white hover:scale-105 transition-transform"
          >
            <img
              src={item.url}
              alt="neko"
              className="w-full h-72 object-cover cursor-pointer"
              onClick={() => setModalImg(item.url)}
            />
          </div>
        ))}
      </div>
      {loading && (
        <div className="my-6 text-gray-500">Loading more images...</div>
      )}

      {/* Modal for large image view */}
      {modalImg && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={modalImg}
              className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-lg border-4 border-white"
              alt="modal neko"
            />
            <button
              onClick={() => setModalImg(null)}
              className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 text-black font-bold shadow"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;