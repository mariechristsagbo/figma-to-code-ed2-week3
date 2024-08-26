'use client';
import { useEffect, useState } from 'react';

const API_KEY = '28e72ec2388149cdb23143180b22ca62';
const API_URL = `https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${API_KEY}`;

export interface NewsArticle {
  author: string | null;
  description: string;
  title: string;
  publishedAt: string;
  url: string;
  urlToImage: string;
  source: { name: string };
}

export const useCryptoNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.statusText}`);
        }

        const data = await response.json();

        const filteredNews = data.articles.filter((article: NewsArticle) =>
          article.title.toLowerCase().includes('crypto') || 
          article.description.toLowerCase().includes('crypto') ||
          article.title.toLowerCase().includes('bitcoin') ||
          article.description.toLowerCase().includes('bitcoin') ||
          article.title.toLowerCase().includes('ethereum') ||
          article.description.toLowerCase().includes('ethereum') ||
          article.title.toLowerCase().includes('cryptocurrency') ||
          article.description.toLowerCase().includes('cryptocurrency')
        );

        const uniqueNews = filteredNews.filter((article: NewsArticle, index: number, self: NewsArticle[]) =>
          index === self.findIndex((a) => a.url === article.url)
        );

        setNews(uniqueNews); 
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error fetching news:", err.message);
          setError(err.message);
        } else {
          console.error("Unexpected error:", err);
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, loading, error };
};
