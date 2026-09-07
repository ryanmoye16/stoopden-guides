const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:8765/index.html?v=hubs3', {
    waitUntil: 'networkidle2'
  });
  
  const results = await page.evaluate(() => {
    const data = {};
    
    // Find hub cards
    const allLinks = Array.from(document.querySelectorAll('a'));
    const hubNames = ['Feed', 'Play', 'Groom', 'Rest', 'Travel'];
    const hubCards = hubNames.map(name => {
      return allLinks.find(link => {
        const h2 = link.querySelector('h2');
        return h2 && h2.textContent.trim() === name;
      });
    }).filter(Boolean);
    
    data.cardsFound = hubCards.length;
    
    // 1. Border styles
    data.borders = hubCards.map(card => {
      const style = window.getComputedStyle(card);
      const h2 = card.querySelector('h2');
      return {
        name: h2.textContent.trim(),
        borderTopStyle: style.borderTopStyle,
        borderStyle: style.borderStyle,
        borderTopWidth: style.borderTopWidth
      };
    });
    
    // 2. Icon dimensions
    data.icons = hubCards.map(card => {
      const h2 = card.querySelector('h2');
      const icon = card.querySelector('span');
      if (icon) {
        const rect = icon.getBoundingClientRect();
        return {
          name: h2.textContent.trim(),
          width: rect.width,
          height: rect.height
        };
      }
      return { name: h2.textContent.trim(), width: null, height: null };
    });
    
    // 3. Card heights
    data.cardHeights = hubCards.map(card => {
      const h2 = card.querySelector('h2');
      const rect = card.getBoundingClientRect();
      return {
        name: h2.textContent.trim(),
        height: rect.height
      };
    });
    
    // 4. Footer texts
    data.footers = hubCards.map(card => {
      const h2 = card.querySelector('h2');
      const text = card.textContent;
      const lines = text.split('\n').map(l => l.trim()).filter(l => l);
      return {
        name: h2.textContent.trim(),
        footer: lines[lines.length - 1]
      };
    });
    
    // 5. "In this issue" dek text
    const bodyText = document.body.textContent;
    const issueMatch = bodyText.match(/IN THIS ISSUE\s+([^\n]+)/);
    data.inThisIssueText = issueMatch ? issueMatch[1].trim() : 'not found';
    data.containsASIN = bodyText.includes('ASIN');
    data.containsAmazonButtons = bodyText.includes('Amazon buttons stay off');
    
    // 6. Gap measurement
    if (hubCards.length > 0) {
      const lastCard = hubCards[hubCards.length - 1];
      const cardRect = lastCard.getBoundingClientRect();
      
      const allElements = Array.from(document.querySelectorAll('*'));
      const issueHeading = allElements.find(el => {
        return el.textContent.includes('IN THIS ISSUE') && el.tagName.match(/H\d/);
      });
      
      if (issueHeading) {
        const issueRect = issueHeading.getBoundingClientRect();
        data.gap = issueRect.top - cardRect.bottom;
      } else {
        data.gap = 'not found';
      }
    }
    
    return data;
  });
  
  console.log(JSON.stringify(results, null, 2));
  
  await browser.close();
})();
