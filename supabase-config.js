// Supabase Configuration for Portfolio Website
// Author: Md Azad

// Supabase configuration
const SUPABASE_CONFIG = {
    // Replace these with your actual Supabase project credentials
    url: 'YOUR_SUPABASE_URL',
    anonKey: 'YOUR_SUPABASE_ANON_KEY'
};

// Initialize Supabase client
let supabase = null;

// Initialize Supabase connection
function initializeSupabase() {
    // Check if Supabase is available
    if (typeof window !== 'undefined' && window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        console.log('Supabase initialized successfully');
        return true;
    } else {
        console.warn('Supabase not available. Using fallback contact form.');
        return false;
    }
}

// Contact form submission with Supabase
async function submitContactForm(formData) {
    if (!supabase) {
        throw new Error('Supabase not initialized');
    }

    try {
        const { data, error } = await supabase
            .from('contact_messages')
            .insert([
                {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
}

// Get contact messages (for admin purposes)
async function getContactMessages() {
    if (!supabase) {
        throw new Error('Supabase not initialized');
    }

    try {
        const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        throw error;
    }
}

// Blog posts management
async function getBlogPosts() {
    if (!supabase) {
        throw new Error('Supabase not initialized');
    }

    try {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false })
            .limit(3);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        throw error;
    }
}

// Projects management
async function getProjects() {
    if (!supabase) {
        throw new Error('Supabase not initialized');
    }

    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('featured', true)
            .order('created_at', { ascending: false })
            .limit(6);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}

// Testimonials management
async function getTestimonials() {
    if (!supabase) {
        throw new Error('Supabase not initialized');
    }

    try {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('approved', true)
            .order('created_at', { ascending: false })
            .limit(5);

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        throw error;
    }
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeSupabase,
        submitContactForm,
        getContactMessages,
        getBlogPosts,
        getProjects,
        getTestimonials,
        SUPABASE_CONFIG
    };
} else {
    // Make functions available globally
    window.SupabaseConfig = {
        initializeSupabase,
        submitContactForm,
        getContactMessages,
        getBlogPosts,
        getProjects,
        getTestimonials,
        SUPABASE_CONFIG
    };
}

// Scroll to Top Button Functionality
// Button ko select karo
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

if (scrollToTopBtn) {
  // Jab user 20px se zyada scroll kare, tab button dikhao
  window.addEventListener('scroll', function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      scrollToTopBtn.style.display = "flex";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  // Jab user button pe click kare, page ko smooth scroll karke top par le jao
  scrollToTopBtn.addEventListener("click", function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
}