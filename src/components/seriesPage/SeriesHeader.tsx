import {Link} from "react-router-dom";
import type { Series } from "../../types/database.types";
import Button from "../Button";
import "./SeriesHeader.css";

interface SeriesHeaderProps {
    series: Series;
    firstIssueNumber: number | null;
    latestIssueNumber: number | null;
}

export default function SeriesHeader({ series, firstIssueNumber, latestIssueNumber }: SeriesHeaderProps) {
    return (
        <div className="series-header-container">
            <div className="series-header-banner-container">
                <img src={series.banner_image_url} alt={series.title} className="series-header-banner" />
                <div className="series-header-fade-bottom"></div>
            </div>

        <div className="banner-content-container">
            <div className="series-header-content">
                <h1 className="series-header-title">{series.title}</h1>
                <div className="series-header-divider"></div>
                <p className="series-header-description">{series.description || "No description available."}</p>
            </div>

            <div className="button-container">
                <Link to={`/reader/${series.slug}/${latestIssueNumber}`}>
                    <Button text="Read Latest Issue" onClick={() => {}} />
                </Link>

                <Link to={`/reader/${series.slug}/${firstIssueNumber}`}>
                    <Button text="Start From Issue 1" onClick={() => {}} />
                </Link>
            </div>

        </div>
        </div>
    );
}
