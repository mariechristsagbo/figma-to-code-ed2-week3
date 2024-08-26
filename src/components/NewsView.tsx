import Header from "./Header"
import NewsCard from "./NewsCard"
export default function NewsView() {
    return (
        <div className="flex-1 p-6 font-mona">
            <Header />
            <div className="py-8">
                <h1 className="font-semibold text-xl dark:text-tokena-light-gray text-tokena-dark">Latest crypto news</h1>
                    <NewsCard />
            </div>
        </div>
    )
}
