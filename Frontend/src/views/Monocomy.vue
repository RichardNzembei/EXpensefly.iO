<script setup>
import { ref, onMounted, computed } from 'vue';
import ArticleCard from '@/components/articleCard.vue';
import NavigationBar from '@/components/navigationBar.vue';

// Sample articles data with more detailed content
const articles = ref([
  {
    id: 1,
    title: 'Mastering Personal Finance Fundamentals',
    content: 'Effective money management is the cornerstone of financial stability. This comprehensive guide covers essential concepts including budgeting techniques, smart saving strategies, and the psychology of spending. Learn how to analyze your cash flow, set realistic financial goals, and develop habits that lead to long-term wealth accumulation.',
    category: 'Fundamentals',
    readTime: '8 min read',
    icon: '💰',
    publishedDate: '2023-05-15',
    featured: true,
    difficulty: 'Beginner',
    tags: ['budgeting', 'saving', 'financial-planning']
  },
  {
    id: 2,
    title: 'Advanced Budgeting Techniques for Financial Freedom',
    content: 'Move beyond basic budgeting with these professional strategies. Explore zero-based budgeting, the 50/30/20 rule, envelope systems, and digital tools that automate your finances. Includes case studies showing how these methods helped individuals pay off debt and increase savings rates by up to 40%.',
    category: 'Budgeting',
    readTime: '12 min read',
    icon: '📊',
    publishedDate: '2023-06-22',
    featured: true,
    difficulty: 'Intermediate',
    tags: ['budgeting', 'expense-tracking', 'financial-tools']
  },
  {
    id: 3,
    title: 'The Complete Guide to Building Investment Portfolios',
    content: 'From stocks and bonds to alternative investments, this guide demystifies asset allocation. Learn how to assess risk tolerance, diversify effectively, and rebalance portfolios. Includes worksheets to calculate your ideal asset mix based on age, goals, and market conditions.',
    category: 'Investing',
    readTime: '15 min read',
    icon: '📈',
    publishedDate: '2023-07-10',
    featured: true,
    difficulty: 'Advanced',
    tags: ['stocks', 'bonds', 'diversification', 'portfolio-management']
  },
  {
    id: 4,
    title: 'Strategic Debt Elimination: Beyond the Basics',
    content: 'This in-depth analysis compares debt repayment strategies (snowball vs avalanche) with mathematical models showing long-term impacts. Includes negotiation tactics with creditors, refinancing options, and psychological techniques to stay motivated during repayment journeys.',
    category: 'Debt',
    readTime: '10 min read',
    icon: '💳',
    publishedDate: '2023-08-05',
    difficulty: 'Intermediate',
    tags: ['debt-repayment', 'credit-management', 'financial-recovery']
  },
  {
    id: 5,
    title: 'Emergency Funds: The Financial Safety Net You Need',
    content: 'Detailed guide on calculating your ideal emergency fund amount based on job stability, health factors, and local cost of living. Includes high-yield savings options, laddered CD strategies, and how to balance liquidity with growth potential for your safety net.',
    category: 'Savings',
    readTime: '6 min read',
    icon: '🛡️',
    publishedDate: '2023-09-12',
    difficulty: 'Beginner',
    tags: ['savings', 'financial-security', 'risk-management']
  },
  {
    id: 6,
    title: 'Credit Score Optimization: Advanced Tactics',
    content: 'Beyond basic credit management, learn how to strategically time credit applications, optimize credit utilization ratios, and leverage authorized user status. Includes case studies showing how individuals boosted scores by 100+ points in 6 months.',
    category: 'Credit',
    readTime: '9 min read',
    icon: '🏆',
    publishedDate: '2023-10-18',
    difficulty: 'Intermediate',
    tags: ['credit-scores', 'credit-repair', 'financial-health']
  },
  {
    id: 7,
    title: 'Tax-Efficient Investing Strategies',
    content: 'Maximize after-tax returns with these advanced portfolio placement strategies. Compare taxable vs tax-advantaged accounts, learn about tax-loss harvesting, and understand how to coordinate investments across different account types for optimal tax efficiency.',
    category: 'Investing',
    readTime: '11 min read',
    icon: '🧾',
    publishedDate: '2023-11-05',
    difficulty: 'Advanced',
    tags: ['tax-planning', 'investment-strategy', 'retirement']
  },
  {
    id: 8,
    title: 'Behavioral Finance: Overcoming Cognitive Biases',
    content: 'Explore how psychological factors influence financial decisions. Learn to recognize and overcome common biases like loss aversion, confirmation bias, and herd mentality that can sabotage investment success. Includes practical exercises to improve financial decision-making.',
    category: 'Psychology',
    readTime: '7 min read',
    icon: '🧠',
    publishedDate: '2023-12-15',
    difficulty: 'Intermediate',
    tags: ['behavioral-finance', 'decision-making', 'psychology']
  }
]);

// Reactive state
const activeCategory = ref('All');
const searchQuery = ref('');
const isLoading = ref(true);
const activeDifficulty = ref('All');
const activeTag = ref('');
const showMobileFilters = ref(false);

// Simulate API loading
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 800);
});

// Computed properties
const categories = computed(() => {
  return ['All', ...new Set(articles.value.map(article => article.category))];
});

const difficulties = computed(() => {
  return ['All', 'Beginner', 'Intermediate', 'Advanced'];
});

const allTags = computed(() => {
  const tags = new Set();
  articles.value.forEach(article => {
    article.tags?.forEach(tag => tags.add(tag));
  });
  return ['All', ...Array.from(tags)];
});

const filteredArticles = computed(() => {
  let result = articles.value;
  
  // Category filter
  if (activeCategory.value !== 'All') {
    result = result.filter(article => article.category === activeCategory.value);
  }
  
  // Difficulty filter
  if (activeDifficulty.value !== 'All') {
    result = result.filter(article => article.difficulty === activeDifficulty.value);
  }
  
  // Tag filter
  if (activeTag.value && activeTag.value !== 'All') {
    result = result.filter(article => article.tags?.includes(activeTag.value));
  }
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(article => 
      article.title.toLowerCase().includes(query) || 
      article.content.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query) ||
      article.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  return result;
});

const featuredArticles = computed(() => {
  return articles.value.filter(article => article.featured);
});

// Utility functions
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const resetFilters = () => {
  activeCategory.value = 'All';
  activeDifficulty.value = 'All';
  activeTag.value = '';
  searchQuery.value = '';
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
    <NavigationBar />
    <div class="container mx-auto px-4 py-6 max-w-7xl mt-12">
      <!-- Back button -->
      <RouterLink 
        to="/dashboard" 
        class="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        <span class="ml-2 text-sm sm:text-base">Back to Dashboard</span>
      </RouterLink>

      <!-- Header section -->
      <header class="text-center mb-8">
        <h1 class="text-2xl sm:text-4xl font-bold text-gray-900 mb-3">Money Mechanics Academy</h1>
        <p class="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
          Your comprehensive guide to mastering personal finance. From beginner basics to advanced investment strategies.
        </p>
      </header>

      <!-- Featured articles carousel -->
      <section v-if="!isLoading && featuredArticles.length > 0" class="mb-10">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Featured Guides
        </h2>
        <div class="relative">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-4 scrollbar-hide">
            <ArticleCard 
              v-for="article in featuredArticles"
              :key="article.id"
              :title="article.title"
              :content="article.content"
              :category="article.category"
              :read-time="article.readTime"
              :icon="article.icon"
              :published-date="formatDate(article.publishedDate)"
              :difficulty="article.difficulty"
              :tags="article.tags"
              featured
              class="min-w-[300px] md:min-w-0"
            />
          </div>
        </div>
      </section>

      <!-- Search and filter section -->
      <div class="mb-8 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex flex-col sm:flex-row gap-4 mb-4">
          <!-- Search input -->
          <div class="relative flex-grow">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search articles by title, content, or tags..."
              class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            >
          </div>
          
          <!-- Mobile filter toggle -->
          <button 
            @click="showMobileFilters = !showMobileFilters"
            class="sm:hidden flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
            </svg>
            Filters
          </button>
        </div>

        <!-- Mobile filters panel -->
        <div v-if="showMobileFilters" class="sm:hidden space-y-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              v-model="activeCategory"
              class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg"
            >
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select 
              v-model="activeDifficulty"
              class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg"
            >
              <option v-for="difficulty in difficulties" :key="difficulty" :value="difficulty">
                {{ difficulty }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tag</label>
            <select 
              v-model="activeTag"
              class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg"
            >
              <option v-for="tag in allTags" :key="tag" :value="tag">
                {{ tag }}
              </option>
            </select>
          </div>
          
          <button 
            @click="resetFilters"
            class="w-full py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
          >
            Reset Filters
          </button>
        </div>

        <!-- Desktop filters -->
        <div class="hidden sm:block space-y-4">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="activeCategory = category"
              class="px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap"
              :class="{
                'bg-blue-600 text-white': activeCategory === category,
                'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300': activeCategory !== category
              }"
            >
              {{ category }}
            </button>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <button
              v-for="difficulty in difficulties"
              :key="difficulty"
              @click="activeDifficulty = difficulty"
              class="px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap"
              :class="{
                'bg-green-600 text-white': activeDifficulty === difficulty,
                'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300': activeDifficulty !== difficulty
              }"
            >
              {{ difficulty }}
            </button>
          </div>
          
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in allTags"
              :key="tag"
              @click="activeTag = tag"
              class="px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap"
              :class="{
                'bg-purple-600 text-white': activeTag === tag,
                'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300': activeTag !== tag
              }"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="animate-pulse">
            <div class="h-48 bg-gray-200"></div>
            <div class="p-6 space-y-4">
              <div class="h-6 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Articles grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleCard 
          v-for="article in filteredArticles"
          :key="article.id"
          :title="article.title"
          :content="article.content"
          :category="article.category"
          :read-time="article.readTime"
          :icon="article.icon"
          :published-date="formatDate(article.publishedDate)"
          :difficulty="article.difficulty"
          :tags="article.tags"
        />
      </div>

      <!-- Empty state -->
      <div v-if="!isLoading && filteredArticles.length === 0" class="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">No articles found</h3>
        <p class="mt-2 text-sm text-gray-600 max-w-md mx-auto">
          We couldn't find any articles matching your filters. Try adjusting your search criteria.
        </p>
        <div class="mt-6">
          <button 
            @click="resetFilters"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset All Filters
          </button>
        </div>
      </div>

      <!-- Newsletter signup -->
      <div v-if="!isLoading" class="mt-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 sm:p-8 text-white">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-xl sm:text-2xl font-bold mb-3">Get Weekly Financial Tips</h2>
          <p class="text-sm sm:text-base text-blue-100 mb-6">
            Subscribe to our newsletter for exclusive content, new article notifications, and personalized financial advice.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              class="flex-grow px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
            <button class="px-6 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
          <p class="text-xs text-blue-200 mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for category tabs */
::-webkit-scrollbar {
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Hide scrollbar for featured articles */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Animation for card hover */
.article-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Responsive typography */
@media (max-width: 640px) {
  .text-4xl {
    font-size: 1.75rem;
  }
}
</style>