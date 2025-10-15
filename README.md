# Portfolio Website - Md Azad

A modern, responsive portfolio website for Md Azad, showcasing skills as a Web UI Designer and Developer.

🌐 **Live Website**: [https://mdazad4153.github.io/my-portfolio-website/](https://mdazad4153.github.io/my-portfolio-website/)

## 🚀 Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Dark/Light Mode**: Toggle between light and dark themes with smooth transitions
- **Modern UI/UX**: Clean, minimalist design with smooth animations and hover effects
- **Interactive Elements**: Smooth scrolling, animated skill bars, testimonial carousel
- **Contact Form**: Integrated with Supabase backend for message storage
- **SEO Optimized**: Meta tags, semantic HTML, and accessibility features
- **Performance**: Optimized images, lazy loading, and efficient code

## 📁 Project Structure

```
portfolioo/
├── index.html              # Main HTML file
├── styles.css              # CSS styles with theme support
├── script.js               # JavaScript functionality
├── supabase-config.js      # Supabase configuration
├── database-schema.sql     # Database schema for Supabase
├── README.md              # Project documentation
└── favicon.ico            # Website favicon
```

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

### Backend
- **Supabase**: Backend-as-a-Service for database and authentication
- **PostgreSQL**: Database (via Supabase)

## 🎨 Design Features

### Images
- **Project Images**: High-quality images from Unsplash matching each project theme
- **Blog Images**: Relevant images for blog post categories
- **Lazy Loading**: Images load efficiently with `loading="lazy"` attribute
- **Fallback**: Icon placeholders if images fail to load
- **Hover Effects**: Smooth zoom effects on project and blog images
- **Overlay**: Gradient overlays on hover for better visual appeal

### Color Scheme
- **Light Mode**: Clean whites and grays with blue accents
- **Dark Mode**: Dark backgrounds with light text and purple accents
- **Accent Colors**: Blue (#6366f1), Orange (#f59e0b), Green (#10b981)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Fallback**: System fonts for better performance

### Layout
- **Grid System**: CSS Grid for responsive layouts
- **Flexbox**: For component alignment
- **Mobile-First**: Responsive design approach

## 📱 Sections

1. **Hero/About**: Introduction and professional summary
2. **Projects**: Portfolio showcase with 6 example projects
3. **Resume**: Education, experience, and certifications
4. **Skills**: Technical skills with progress bars
5. **Testimonials**: Client feedback carousel
6. **Blog**: Latest blog posts (3 recent posts)
7. **Contact**: Contact form and social media links

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Supabase account (for backend functionality)

### Installation

1. **Clone or download** the project files
2. **Set up Supabase**:
   - Create a new Supabase project
   - Run the SQL commands from `database-schema.sql` in your Supabase SQL editor
   - Get your project URL and anon key

3. **Configure Supabase**:
   - Open `supabase-config.js`
   - Replace `YOUR_SUPABASE_URL` with your project URL
   - Replace `YOUR_SUPABASE_ANON_KEY` with your anon key

4. **Open the website**:
   - **Live Version**: Visit [https://mdazad4153.github.io/my-portfolio-website/](https://mdazad4153.github.io/my-portfolio-website/)
   - **Local Development**: Simply open `index.html` in your web browser
   - Or use a local server for better development experience

### Local Development Server

For better development experience, use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `https://mdazad4153.github.io/my-portfolio-website/`

## 🔧 Customization

### Personal Information
Update the following in `index.html`:
- Name and title in hero section
- Contact information (phone, email)
- Social media links
- Project details and descriptions
- Resume information and Google Drive link (see [RESUME_LINK.md](RESUME_LINK.md))

### Styling
Modify `styles.css` to customize:
- Color scheme in CSS variables
- Typography and spacing
- Animations and transitions
- Layout and responsive breakpoints

### Content Management
- **Projects**: Add/edit projects in the projects section
- **Blog Posts**: Update blog content in the blog section
- **Skills**: Modify skill levels and categories
- **Testimonials**: Add client testimonials

## 📊 Database Schema

The Supabase database includes tables for:
- `contact_messages`: Contact form submissions
- `blog_posts`: Blog content management
- `projects`: Portfolio projects
- `testimonials`: Client testimonials
- `skills`: Technical skills
- `work_experience`: Professional experience
- `education`: Educational background
- `certifications`: Professional certifications

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Public read access for portfolio content
- Authenticated access required for admin functions
- Contact form submissions are publicly accessible

## 📈 Performance

- Optimized CSS with minimal unused styles
- Efficient JavaScript with event delegation
- Responsive images and lazy loading
- Minimal external dependencies
- Fast loading times

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is created for Md Azad's personal portfolio. Feel free to use as inspiration for your own portfolio.

## 📞 Contact

**Md Azad**
- 🌐 **Portfolio**: [https://mdazad4153.github.io/my-portfolio-website/](https://mdazad4153.github.io/my-portfolio-website/)
- 📧 Email: aiechnonova@gmail.com
- 📱 Phone: +91 6299256892
- 🌐 Web UI Designer & Developer

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons by Font Awesome
- Fonts by Google Fonts
- Backend powered by Supabase

---

**Note**: This portfolio website is designed to be easily maintainable and customizable. All content can be updated through the HTML file or by connecting to a CMS through Supabase.

