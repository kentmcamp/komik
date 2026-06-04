import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import type { Series, Issue } from '../types/database.types';
import IssueCard from '../components/IssueCard';

interface IssueWithPageCount extends Issue {
    page_count: number;
}

export default function SeriesPage() {
  const { slug } = useParams<{ slug: string }>();

  const [series, setSeries] = useState<Series | null>(null);
  const [issues, setIssues] = useState<IssueWithPageCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSeriesData() {
      if (!slug) return;

      const resSeries = await supabase
        .from('Series')
        .select('*')
        .eq('slug', slug)
        .single();

      if (resSeries.data) {
        setSeries(resSeries.data);

        const resIssues = await supabase
          .from('Issue')
          .select('*, Page(id)')
          .eq('series_id', resSeries.data.id);

        if (resIssues.data) {
          const rows = resIssues.data as (Issue & { Page?: { id: string }[] })[];
          const processedIssues: IssueWithPageCount[] = rows.map(item => ({
            ...item,
            page_count: item.Page ? item.Page.length : 0
          }));
          setIssues(processedIssues);
        }
      }
      setLoading(false);
    }

    fetchSeriesData();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!series) return <div>Not Found</div>;

  return (
    <div>
      <h1>{series.title}</h1>
      <p>{series.description}</p>
      {/* <img src={series.banner_image_url || ''} alt="banner"/> */}

      {issues.map(issue => (
        <IssueCard key={issue.id} issue={issue} seriesSlug={series.slug} pageCount={issue.page_count + 1} />
      ))}


       <br/>
      <Link to="/">Series List</Link>
    </div>
  );
}
