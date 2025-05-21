import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BlogWrite() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [status, setStatus] = useState('draft');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [publishDate, setPublishDate] = useState('');

  useEffect(() => {
    const now = new Date().toISOString();
    setCreatedAt(now);
    setPublishDate(now);

    return () => {
      if (status !== 'published') {
        handleSaveDraft();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSaveDraft = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tags);
    formData.append('status', 'draft');
    formData.append('createdAt', createdAt);
    formData.append('updatedAt', new Date().toISOString());
    if (image) formData.append('image', image);

    try {
      const res = await fetch('http://localhost:5000/api/blogs/save-draft',{
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log('Draft saved:', data);
    } catch (err) {
      console.error('Error saving draft:', err);
    }
  };

  const handlePublish = async () => {
    const now = new Date().toISOString();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tags);
    formData.append('status', 'published');
    formData.append('createdAt', createdAt);
    formData.append('updatedAt', now);
    formData.append('publishDate', publishDate || now);
    if (image) formData.append('image', image);

    try {
      const res = await fetch('http://localhost:5000/api/blogs/publish', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log('Published:', data);
      setStatus('published');
      navigate('/home');
    } catch (err) {
      console.error('Error publishing blog:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-24">
      <h1 className="text-3xl font-bold mb-6">Write a Blog</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 mb-4 border rounded"
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        className="w-full p-3 mb-4 border rounded"
      />

      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-3 mb-4 border rounded"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {imagePreview && (
        <div className="mb-4">
          <img src={imagePreview} alt="Preview" className="max-h-64 object-cover rounded" />
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handlePublish}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Publish
        </button>

        <button
          onClick={handleSaveDraft}
          className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
        >
          Save Draft
        </button>
      </div>
    </div>
  );
}
