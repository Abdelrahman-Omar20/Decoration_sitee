import { Calendar, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import './Blog.css';

const blogPosts = [
    {
        id: 1,
        title: '10 Wedding Decoration Trends for 2024',
        excerpt: 'Discover the latest trends in wedding decor, from sustainable florals to bold color palettes that are defining modern celebrations.',
        category: 'Wedding',
        date: 'Jan 15, 2024',
        readTime: '5 min read',
        featured: true,
    },
    {
        id: 2,
        title: 'How to Choose the Perfect Color Palette for Your Event',
        excerpt: 'A comprehensive guide to selecting colors that create the right mood and atmosphere for any celebration.',
        category: 'Tips',
        date: 'Jan 10, 2024',
        readTime: '4 min read',
        featured: false,
    },
    {
        id: 3,
        title: 'Behind the Scenes: A Luxury Corporate Gala',
        excerpt: 'Take a peek into the planning and execution of a stunning corporate event for 500 guests.',
        category: 'Corporate',
        date: 'Jan 5, 2024',
        readTime: '6 min read',
        featured: false,
    },
    {
        id: 4,
        title: 'DIY vs Professional Decoration: What You Need to Know',
        excerpt: 'Understanding when to DIY and when to hire professionals for your special occasion.',
        category: 'Tips',
        date: 'Dec 28, 2023',
        readTime: '7 min read',
        featured: false,
    },
    {
        id: 5,
        title: 'Creating a Magical Birthday Party for Kids',
        excerpt: 'Fun and creative ideas for throwing an unforgettable birthday celebration that kids will love.',
        category: 'Party',
        date: 'Dec 20, 2023',
        readTime: '5 min read',
        featured: false,
    },
    {
        id: 6,
        title: 'Sustainable Event Decoration: Eco-Friendly Ideas',
        excerpt: 'How to create beautiful events while being mindful of environmental impact.',
        category: 'Sustainability',
        date: 'Dec 15, 2023',
        readTime: '6 min read',
        featured: false,
    },
];

export default function Blog() {
    const featuredPost = blogPosts.find(post => post.featured);
    const regularPosts = blogPosts.filter(post => !post.featured);

    return (
        <div className="blog-page">
            {/* Page Header */}
            <section className="page-header">
                <div className="container">
                    <h1>Blog & Ideas</h1>
                    <div className="accent-line"></div>
                    <p>Inspiration, tips, and behind-the-scenes stories</p>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section className="featured-post-section">
                    <div className="container">
                        <div className="featured-post card">
                            <div className="featured-image">
                                <div className="image-placeholder skeleton"></div>
                            </div>
                            <div className="featured-content">
                                <span className="post-category">{featuredPost.category}</span>
                                <h2>{featuredPost.title}</h2>
                                <p>{featuredPost.excerpt}</p>
                                <div className="post-meta">
                                    <span><Calendar size={14} /> {featuredPost.date}</span>
                                    <span><Clock size={14} /> {featuredPost.readTime}</span>
                                </div>
                                <a href={`/blog/${featuredPost.id}`} className="btn btn-primary">
                                    Read Article
                                    <ArrowRight size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Blog Grid */}
            <section className="blog-grid-section">
                <div className="container">
                    <div className="blog-grid">
                        {regularPosts.map((post) => (
                            <article key={post.id} className="blog-card card">
                                <div className="blog-thumbnail">
                                    <div className="thumbnail-placeholder skeleton"></div>
                                    <span className="post-category">{post.category}</span>
                                </div>
                                <div className="blog-content">
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                    <div className="post-footer">
                                        <div className="post-meta">
                                            <span><Calendar size={12} /> {post.date}</span>
                                            <span><Clock size={12} /> {post.readTime}</span>
                                        </div>
                                        <a href={`/blog/${post.id}`} className="read-more">
                                            Read More <ChevronRight size={14} />
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="section-cta">
                        <button className="btn btn-secondary btn-lg">
                            Load More Articles
                        </button>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter-section">
                <div className="container">
                    <div className="newsletter-card">
                        <div className="newsletter-content">
                            <h2>Get Inspired</h2>
                            <p>Subscribe to our newsletter for decoration tips, trends, and exclusive offers.</p>
                        </div>
                        <form className="newsletter-form">
                            <input
                                type="email"
                                className="input"
                                placeholder="Enter your email"
                                required
                            />
                            <button type="submit" className="btn btn-primary">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
