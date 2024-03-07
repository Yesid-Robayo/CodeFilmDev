import { useHomePageLogic } from "./useHomePageLogic";

export function HomePage() {
    const { labels, styles } = useHomePageLogic();
    return (
        <div className='w-full py-10 h-full flex-row animate-enterFromLeft justify-center items-center' style={{ backgroundColor: styles.colors['blue-100'] }}>
            <h1>Home</h1>
        </div>
    );
}