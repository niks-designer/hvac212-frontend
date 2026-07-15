# Next.js Frontend - WordPress Headless CMS Setup

This is a Next.js frontend connected to a WordPress headless CMS via REST API.

## Configuration

### Environment Variables

The WordPress API URL is configured in `.env.local`:

```
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost/triangles-ph/wp-json
```

Update this URL if your WordPress installation is at a different location.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage - displays ACF flexible content + posts
│   ├── globals.css             # Global styles
│   └── posts/
│       └── [slug]/
│           └── page.tsx        # Individual post page
├── components/
│   ├── PostCard.tsx            # Reusable post card component
│   ├── HeroBanner.tsx          # Hero banner section
│   ├── TextSection.tsx         # Text content section
│   ├── FeaturesGrid.tsx        # Features grid section
│   ├── CTABanner.tsx           # Call-to-action banner section
│   └── FlexibleContentRenderer.tsx  # Dynamic renderer for ACF sections
└── lib/
    └── wordpress.ts            # WordPress API utility functions
```

## Features

- ✅ ACF Flexible Content support
- ✅ Multiple layout components (Hero Banner, Text, Features Grid, CTA)
- ✅ Fetch posts from WordPress REST API
- ✅ Display posts on homepage
- ✅ Individual post pages with dynamic routing
- ✅ Server-side rendering with Next.js App Router
- ✅ ISR (Incremental Static Regeneration) - pages cached for 1 hour
- ✅ TypeScript support

## Available Functions

Located in `src/lib/wordpress.ts`:

- `getPosts()` - Fetch multiple posts
- `getPostBySlug()` - Fetch a single post by slug
- `getPageBySlugWithACF()` - Fetch a page with ACF data
- `getPages()` - Fetch WordPress pages
- `getPageBySlug()` - Fetch a single page by slug
- `getMediaById()` - Fetch media/images by ID
- `getCustomPostType()` - Fetch custom post types

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The frontend will be available at `http://localhost:3000`

## ACF Flexible Content Setup

### Prerequisites

1. **Advanced Custom Fields Pro** plugin installed in WordPress
2. Create a flexible content field in ACF (e.g., `page_builder`)
3. Add field layouts as described below

### Supported Layouts

#### 1. Hero Banner
- **Field Name**: `acf_fc_layout: "hero_banner"`
- **Required Fields**:
  - `heading` (text) - Main headline
  - `description` (text) - Subtitle/description
  - `background_image` (image) - Background image

```json
{
  "acf_fc_layout": "hero_banner",
  "heading": "Trusted Professional Painters in New Jersey",
  "description": "We want you to love the way your home looks",
  "background_image": {
    "url": "http://example.com/image.jpg",
    "alt": "House"
  }
}
```

#### 2. Text Section
- **Field Name**: `acf_fc_layout: "text_section"`
- **Fields**:
  - `title` (text) - Optional section title
  - `content` (wysiwyg) - Rich text content

```json
{
  "acf_fc_layout": "text_section",
  "title": "About Us",
  "content": "<p>Welcome to our company...</p>"
}
```

#### 3. Features Grid
- **Field Name**: `acf_fc_layout: "features_grid"`
- **Fields**:
  - `title` (text) - Optional grid title
  - `columns` (number) - Number of columns (2, 3, or 4)
  - `features` (repeater) - Array of features with:
    - `title` (text)
    - `description` (text)
    - `icon` (image) - Optional icon

```json
{
  "acf_fc_layout": "features_grid",
  "title": "Our Services",
  "columns": 3,
  "features": [
    {
      "title": "Interior Painting",
      "description": "Professional interior painting services",
      "icon": { "url": "..." }
    }
  ]
}
```

#### 4. CTA Banner
- **Field Name**: `acf_fc_layout: "cta_banner"`
- **Fields**:
  - `title` (text) - Banner title
  - `description` (text) - Banner description
  - `button` (object) - CTA button
    - `text` (text) - Button text
    - `url` (text) - Button URL
    - `new_tab` (boolean) - Open in new tab
  - `background_image` (image) - Optional background
  - `background_color` (color) - Background color class

```json
{
  "acf_fc_layout": "cta_banner",
  "title": "Get Your Free Quote",
  "description": "Contact us today",
  "button": {
    "text": "Contact Us",
    "url": "/contact",
    "new_tab": false
  },
  "background_color": "bg-blue-600"
}
```

### Creating ACF Field Group

1. In WordPress Admin, go to **ACF → Field Groups**
2. Create a new field group (e.g., "Page Builder")
3. Add a flexible content field named `page_builder`
4. Add the layouts above as flexible content rows
5. Set location rule: **Pages → Home equals true** (for homepage)

### HomePage API Response Example

```
GET http://localhost/triangles-ph/wp-json/wp/v2/pages?slug=home&acf=true

{
  "id": 2,
  "title": { "rendered": "Home" },
  "acf": {
    "page_builder": [
      {
        "acf_fc_layout": "hero_banner",
        "heading": "Trusted Professional Painters",
        "description": "Your home deserves the best",
        "background_image": { "url": "..." }
      },
      {
        "acf_fc_layout": "features_grid",
        ...
      }
    ]
  }
}
```

## WordPress Requirements

Make sure your WordPress installation has:

1. **REST API** enabled (enabled by default in modern WordPress)
2. **Public access** to `/wp-json` endpoint
3. **Advanced Custom Fields Pro** plugin installed (for ACF flexible content)
4. **Posts** published and publicly accessible
5. ACF field groups configured (see ACF Flexible Content Setup section)

## Example API Endpoints

Your WordPress API provides these endpoints:

- `http://localhost/triangles-ph/wp-json/wp/v2/posts` - Get all posts
- `http://localhost/triangles-ph/wp-json/wp/v2/pages` - Get all pages
- `http://localhost/triangles-ph/wp-json/wp/v2/media` - Get all media files

## Customization

### Adding New Layout Types

1. Create a new component in `src/components/` (e.g., `MyNewLayout.tsx`)
2. Add the layout to `src/components/FlexibleContentRenderer.tsx`:

```typescript
case "my_new_layout":
  return (
    <MyNewLayout
      key={index}
      data={section}
    />
  );
```

3. In WordPress, add the new layout to your ACF flexible content field
4. The homepage will automatically render the new layout

### Adding Custom Post Types

Modify `src/lib/wordpress.ts` and add:

```typescript
export async function getCustomPosts() {
  return getCustomPostType('custom-post-type-name');
}
```

### Styling

Tailwind CSS is configured. Modify `src/app/globals.css` and component classes as needed.

### Adding More Pages

Create new files in `src/app/` following Next.js App Router conventions.

## Troubleshooting

If posts aren't loading:

1. Check the WordPress API URL in `.env.local`
2. Verify WordPress is running at `http://localhost/triangles-ph`
3. Check browser console for CORS errors
4. Ensure posts are published in WordPress
5. Try accessing the API directly: `http://localhost/triangles-ph/wp-json/wp/v2/posts`

## CORS Issues

If you encounter CORS errors, you may need to configure CORS headers in WordPress. Use a CORS plugin like "WP CORS" or add headers via `.htaccess`.
