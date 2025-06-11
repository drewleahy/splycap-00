
# Deal Template System Guide

This guide explains how to use the deal template system to create new deal pages quickly and consistently.

## Overview

The deal template system provides a reusable structure based on the successful Lyten deal page. It includes all the same sections, branding, and layout while allowing you to easily customize the content for different deals.

## Key Components

### 1. DealTemplate Component
- Located: `src/components/deal/DealTemplate.tsx`
- Main template component that renders all sections
- Uses existing landing page components for consistency

### 2. DealPageConfig Type
- Located: `src/types/deal-template.ts`
- TypeScript interface defining the structure for deal configurations
- Ensures type safety and consistency

### 3. Utility Functions
- Located: `src/utils/dealTemplateUtils.ts`
- Helper functions for creating and validating configurations
- Route generation utilities

## Creating a New Deal Page

### Step 1: Create the Configuration
Create a new file in `src/config/deal-pages/[company-name].ts`:

```typescript
import { DealPageConfig } from '@/types/deal-template';
import { Icon1, Icon2 } from 'lucide-react';

export const yourCompanyConfig: DealPageConfig = {
  id: "your-company",
  dealName: "Your Company Investment Opportunity", 
  companyName: "Your Company",
  route: "/deals/your-company-exclusive-2025",
  
  seo: {
    title: "Exclusive Your Company Investment - SPLY Capital",
    description: "Your compelling description...",
    keywords: ["keyword1", "keyword2"]
  },
  
  hero: {
    headline: "Your compelling headline",
    subheadline: "Your detailed subheadline...",
    primaryCta: {
      text: "Schedule a Call",
      link: "https://calendly.com/haley-splycapital/deal-interest"
    }
    // Add secondary and tertiary CTAs as needed
  },
  
  // Continue with all required sections...
};
```

### Step 2: Create the Page Component
Create a new file in `src/pages/deal/YourCompany.tsx`:

```typescript
import React from 'react';
import { DealTemplate } from '@/components/deal/DealTemplate';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { yourCompanyConfig } from '@/config/deal-pages/your-company';

const YourCompany = () => {
  return (
    <ErrorBoundary>
      <DealTemplate config={yourCompanyConfig} />
    </ErrorBoundary>
  );
};

export default YourCompany;
```

### Step 3: Add Route to App.tsx
Add the route to your routing configuration:

```typescript
import YourCompany from "./pages/deal/YourCompany";

// In your Routes:
<Route path="/deals/your-company-exclusive-2025" element={<YourCompany />} />
```

## Configuration Sections

### Required Sections
- `hero`: Main headline and call-to-action buttons
- `opportunity`: Investment opportunity overview
- `company`: Company description with logo
- `thesis`: Why you're investing (features with icons)
- `cta`: Final call-to-action section
- `footer`: Footer with copyright

### Optional Sections
- `market`: Market context and opportunity size
- `traction`: Commercial traction and customer validation
- `backing`: Strategic backing and validation
- `video`: Company video section

## Best Practices

1. **Consistent Branding**: The template maintains SPLY Capital branding automatically
2. **Responsive Design**: All components are mobile-responsive
3. **SEO Optimization**: Each page has proper meta tags and titles
4. **Type Safety**: Use TypeScript interfaces to prevent configuration errors
5. **Reusable Assets**: Store logos and images in the public folder
6. **Standard CTAs**: Use consistent call-to-action patterns across deals

## Example Usage

See `src/config/deal-pages/example-deal.ts` for a complete example configuration that you can use as a starting point for your own deal pages.

## Customization

The template is designed to be flexible. You can:
- Skip optional sections by not including them in the config
- Customize button text and links for your specific deal
- Add custom icons from Lucide React for thesis points
- Include deal-specific images and branding elements

## Maintenance

When you need to update the template structure:
1. Update the `DealPageConfig` type if adding new sections
2. Modify the `DealTemplate` component to handle new sections
3. Update existing configurations to match any breaking changes
4. Test with multiple deal pages to ensure consistency
