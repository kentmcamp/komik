import { Link } from "react-router-dom";
import type { Issue } from "../types/database.types";
import "./IssueCard.css";

interface IssueCardProps {
  issue: Issue;
  seriesSlug: string;
  pageCount: number;
}

export default function IssueCard({ issue, seriesSlug, pageCount }: IssueCardProps) {
  return (
<Link to={`/reader/${seriesSlug}/${issue.issue_number}`} className="issue-card-link">
  <div className="issue-card-container">


    <div className="issue-card-image">
      <img src={issue.cover_image_url} alt={issue.title} />
    </div>


    <div className="issue-card-text-container">

      <div className="issue-card-top">
        <span className="issue-card-number">ISSUE: {issue.issue_number}</span>
        <span className="issue-card-date">{issue.date}</span>
      </div>

      <h3 className="issue-card-title">{issue.title}</h3>


      <div className="issue-card-divider"></div>

      <p className="issue-card-description">
        {issue.description || "No description available."}
      </p>

      <div className="issue-card-footer">
        <div className="issue-card-parameter">
          <span className="pages-label">PAGES:</span>
          <span className="pages-number">{pageCount.toString().padStart(2, '0')}</span>
        </div>
        <div className="read-button">READ &gt;&gt;</div>
      </div>

    </div>

  </div>
</Link>
  );
}
