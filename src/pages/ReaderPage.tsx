import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import type { Issue, Page } from '../types/database.types';
import './ReaderPage.css';


export default function ReaderPage() {
  const { seriesSlug, issueNumber } = useParams<{ seriesSlug: string; issueNumber: string }>();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReaderData() {
      if (!seriesSlug || !issueNumber) return;

      // 1. Fetch the issue by matching both series slug and issue number
      const resIssue = await supabase
        .from('Issue')
        .select('*, Series!inner(slug)')
        .eq('issue_number', issueNumber)
        .eq('Series.slug', seriesSlug)
        .single();

      if (resIssue.data) {
        setIssue(resIssue.data as Issue);

        // 2. Fetch all pages for the issue using its ID
        const resPages = await supabase
          .from('Page')
          .select('*')
          .eq('issue_id', resIssue.data.id);

        if (resPages.data) {
          const sortedPages = resPages.data.sort((a, b) => a.page_number - b.page_number);
          setPages(sortedPages);
        }
      }

      setLoading(false);
    }

    fetchReaderData();
  }, [seriesSlug, issueNumber]);

  if (loading) return <div>Loading Pages...</div>;

  return (
    <div className="reader-container">
      {/* Show the cover page first if the issue data loaded successfully */}
      {issue && (
        <div>
          <img
            src={issue.cover_image_url}
            alt="Cover Page"
            style={{ width: '100vw' }}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      {/* Show the rest of the comic pages */}
      {pages.map(page => (
        <div key={page.id}>
          <img
            src={page.image_url}
            alt={`Page ${page.page_number}`}
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}

    {/* This will be replaced with a reader, controls component */}
    <Link to="/">Series List</Link>
    </div>
  );
}
