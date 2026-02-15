// Chain filter functionality
let activeChain = 'all';

function filterChain(chain) {
  activeChain = chain;
  
  // Update button states
  const buttons = document.querySelectorAll('button[onclick^="filterChain"]');
  buttons.forEach(btn => {
    if (btn.textContent.toLowerCase().includes(chain) || (chain === 'all' && btn.textContent.includes('All'))) {
      btn.className = 'pill-active px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-vault-emerald focus:ring-offset-2 focus:ring-offset-vault-black';
    } else {
      btn.className = 'pill-inactive px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none';
    }
  });
  
  // Filter token table rows
  const rows = document.querySelectorAll('#tokenTable tr[data-chain]');
  rows.forEach(row => {
    if (chain === 'all' || row.dataset.chain === chain) {
      row.style.display = '';
      // Re-trigger animation
      row.style.animation = 'none';
      setTimeout(() => {
        row.style.animation = 'fadeIn 0.4s ease-out forwards';
      }, 10);
    } else {
      row.style.display = 'none';
    }
  });
}

// Animated counter for portfolio value
function animateValue(element, start, end, duration) {
  if (!element) return;
  
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = progress * (end - start) + start;
    element.textContent = '$' + current.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Initialize counter animation on load
window.addEventListener('load', () => {
  const portfolioValue = document.querySelector('.counter');
  if (portfolioValue) {
    const targetValue = 124847.32;
    animateValue(portfolioValue, targetValue * 0.85, targetValue, 1200);
  }
});

// Add hover effect for donut segments
document.addEventListener('DOMContentLoaded', () => {
  const segments = document.querySelectorAll('.donut-segment');
  segments.forEach(segment => {
    segment.addEventListener('mouseenter', function() {
      this.style.opacity = '0.8';
    });
    segment.addEventListener('mouseleave', function() {
      this.style.opacity = '1';
    });
  });
});

// Simulate real-time price updates (optional enhancement)
function updatePrices() {
  const priceElements = document.querySelectorAll('#tokenTable tr[data-chain]');
  priceElements.forEach(row => {
    const changeCell = row.querySelector('td:nth-child(4)');
    if (changeCell && Math.random() > 0.7) {
      // Randomly update 30% of tokens
      const currentChange = parseFloat(changeCell.textContent);
      const newChange = currentChange + (Math.random() - 0.5) * 0.5;
      const isPositive = newChange >= 0;
      changeCell.textContent = (isPositive ? '+' : '') + newChange.toFixed(1) + '%';
      changeCell.className = isPositive 
        ? 'text-right text-sm text-vault-emerald' 
        : 'text-right text-sm text-vault-red';
    }
  });
}

// Update prices every 10 seconds (optional - can be disabled)
// setInterval(updatePrices, 10000);