export interface Series {
    id: number;
    title: string;
    slug: string; // For routing
    description?: string;
    complete: boolean;
    banner_image_url?: string; // For the series page banner
    created_at: string;
}

export interface Issue {
    id: number;
    series_id: number; // Foreign key to Series
    act?: number; // For sorting issues on the series page
    issue_number: number;
    title: string;
    description?: string;
    date: string;
    cover_image_url: string; // For the issue component
    created_at: string;
}

export interface Page {
    id: number;
    issue_id: number; // Foreign key to Issue
    page_number: number; // For sorting pages within an issue
    image_url: string; // Page content
    created_at: string;
}
