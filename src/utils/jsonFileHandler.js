// src/utils/jsonFileHandler.js
export class JsonFileHandler {
  constructor() {
    this.fileName = 'sparkle-co-users-data.json';
    this.localStorageKey = 'sparkleCoUsersData';
  }

  // 📁 Initialize or load existing data
  getInitialData() {
    return {
      metadata: {
        app_name: "Sparkle & Co Jewelry Store",
        created_at: new Date().toISOString(),
        last_updated: new Date().toISOString(),
        total_users: 0,
        total_events: 0,
        version: "1.0.0"
      },
      users: []
    };
  }

  // 📂 Load data from localStorage/file
  loadUsersData() {
    try {
      const stored = localStorage.getItem(this.localStorageKey);
      if (stored) {
        const data = JSON.parse(stored);
        console.log('📂 Loaded users data:', data.metadata);
        return data;
      }
      return this.getInitialData();
    } catch (error) {
      console.error('❌ Error loading users data:', error);
      return this.getInitialData();
    }
  }

  // 💾 Save data to localStorage and download JSON file
  async saveUsersData(data) {
    try {
      // Update metadata
      data.metadata.last_updated = new Date().toISOString();
      data.metadata.total_users = data.users.length;
      data.metadata.total_events = data.users.reduce((total, user) => 
        total + (user.moengageEvents ? user.moengageEvents.length : 0), 0
      );

      // Save to localStorage
      localStorage.setItem(this.localStorageKey, JSON.stringify(data));

      // Auto-download file (every 5 events for demo)
      if (data.metadata.total_events % 5 === 0 && data.metadata.total_events > 0) {
        this.downloadJsonFile(data);
      }

      console.log('✅ Users data saved successfully');
      return true;
    } catch (error) {
      console.error('❌ Error saving users data:', error);
      return false;
    }
  }

  // 📥 Download JSON file
  downloadJsonFile(data) {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `sparkle-co-users-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('📥 JSON file downloaded successfully');
    } catch (error) {
      console.error('❌ Error downloading file:', error);
    }
  }

  // 📤 Upload JSON file
  async uploadJsonFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          localStorage.setItem(this.localStorageKey, JSON.stringify(data));
          console.log('📤 File uploaded successfully');
          resolve(data);
        } catch (error) {
          console.error('❌ Error parsing uploaded file:', error);
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  // 👤 Add user or event to JSON data
  async addUserEvent(userEmail, eventType, eventData, userInfo = {}) {
    try {
      const data = this.loadUsersData();
      
      // Find or create user
      let userIndex = data.users.findIndex(user => user.userId === userEmail);
      
      if (userIndex === -1) {
        // Create new user
        const newUser = {
          userId: userEmail,
          name: userInfo.name || `${userInfo.firstName || ''} ${userInfo.lastName || ''}`.trim() || 'Unknown User',
          firstName: userInfo.firstName || '',
          lastName: userInfo.lastName || '',
          email: userEmail,
          mobile: userInfo.mobile || '',
          birthday: userInfo.birthday || '',
          gender: userInfo.gender || '',
          loginMethod: userInfo.loginMethod || 'email',
          registrationDate: new Date().toISOString(),
          lastLoginDate: new Date().toISOString(),
          moengageEvents: [],
          stats: {
            totalEvents: 0,
            cartActions: 0,
            purchases: 0,
            totalSpent: 0,
            loginCount: 0,
            favoriteCategories: []
          }
        };
        
        data.users.push(newUser);
        userIndex = data.users.length - 1;
        console.log('🆕 New user added to JSON:', userEmail);
      }

      // Add MoEngage event
      const moengageEvent = {
        event: eventType,
        timestamp: new Date().toISOString(),
        data: eventData
      };

      data.users[userIndex].moengageEvents.push(moengageEvent);
      data.users[userIndex].stats.totalEvents++;
      
      // Update specific stats
      if (eventType === 'Add_to_Cart') {
        data.users[userIndex].stats.cartActions++;
        if (eventData.product_category) {
          const categories = data.users[userIndex].stats.favoriteCategories;
          if (!categories.includes(eventData.product_category)) {
            categories.push(eventData.product_category);
          }
        }
      } else if (eventType === 'user_login') {
        data.users[userIndex].stats.loginCount++;
        data.users[userIndex].lastLoginDate = new Date().toISOString();
      } else if (eventType === 'Purchase_Completed') {
        data.users[userIndex].stats.purchases++;
        data.users[userIndex].stats.totalSpent += (eventData.order_total || eventData.product_price || 0);
      }

      // Save updated data
      await this.saveUsersData(data);
      
      console.log('✅ Event added to JSON:', eventType, 'for', userEmail);
      return data;
    } catch (error) {
      console.error('❌ Error adding user event:', error);
      return null;
    }
  }
}

// Export singleton instance
export const jsonHandler = new JsonFileHandler();