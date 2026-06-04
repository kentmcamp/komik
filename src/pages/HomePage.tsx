import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import type { Series } from '../types/database.types';

export default function HomePage() {
  const [seriesList, setSeriesList] = useState<Series[]>([]);

  useEffect(() => {
    async function fetchAllSeries() {
      const { data } = await supabase.from('Series').select('*');
      if (data) setSeriesList(data);
    }
    fetchAllSeries();
  }, []);

  return (
    <div>

      Series List:
      <ul>
        {seriesList.map(series => (
          <li key={series.id}>
            <Link to={`/series/${series.slug}`}>
              {series.title}
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}
