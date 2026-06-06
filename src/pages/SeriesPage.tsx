import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../utils/supabase";
import type { Series, Issue } from "../types/database.types";
import IssueCard from "../components/seriesPage/IssueCard";
import SeriesHeader from "../components/seriesPage/SeriesHeader";

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
        .from("Series")
        .select("*")
        .eq("slug", slug)
        .single();

      if (resSeries.data) {
        setSeries(resSeries.data);

        const resIssues = await supabase
          .from("Issue")
          .select("*, Page(id)")
          .eq("series_id", resSeries.data.id)
          .order("issue_number", { ascending: true });

        if (resIssues.data) {
          const rows = resIssues.data as (Issue & {
            Page?: { id: string }[];
          })[];
          const processedIssues: IssueWithPageCount[] = rows.map((item) => ({
            ...item,
            page_count: item.Page ? item.Page.length : 0,
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

  // For the SeriesHeader buttons
  const firstIssueNumber = issues[0]?.issue_number ?? null;
  const latestIssueNumber = issues[issues.length - 1]?.issue_number ?? null;

  return (
    <div>
      <SeriesHeader
        series={series}
        firstIssueNumber={firstIssueNumber}
        latestIssueNumber={latestIssueNumber}
      />

      {Array.from({ length: 5 }, (_, i) =>
        issues.map((issue) => (
          <IssueCard
            key={`${issue.id}-${i}`}
            issue={issue}
            seriesSlug={series.slug}
            pageCount={issue.page_count + 1}
          />
        )),
      )}

      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          issue={issue}
          seriesSlug={series.slug}
          pageCount={issue.page_count + 1}
        />
      ))}
      <br />
      <Link to="/">Return To Series List</Link>
    </div>
  );
}
