// // utils/personalization.js

// const PERSONALIZATION_CONFIG = {
//   apiUrl: 'https://sdk-01.moengage.com/v1/experiences/fetch',
//   appKey: 'MYL4VOAV1ZAERHPDK9NV42XR',
//   authToken: 'TVlMNFZPQVYxWkFFUkhQREs5TlY0MlhSOjZHdHhfeGJsbDhmV2tobFdnYklaUXFwSA==', // Your auth token from the curl
// };

// /**
//  * Fetch personalized experience from MoEngage Server-side API
//  */
// export const fetchPersonalizedExperience = async (experienceKey, userInfo = {}) => {
//   try {
//     console.log(`🚀 Fetching personalization for: ${experienceKey}`);
    
//     const payload = {
//       identifiers: {
//         customer_id: userInfo.userId || `user_${Date.now()}`, // Generate unique ID if not provided
//         user_identifiers: {
//           u_em: userInfo.email || '',
//           u_mb: userInfo.mobile || ''
//         }
//       },
//       experience_key: [experienceKey],
//       USER_IP_ADDRESS: await getUserIP(),
//       USER_AGENT: navigator.userAgent,
//       DAY_OF_THE_WEEK: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
//       TIME_OF_THE_DAY: new Date().getHours().toString().padStart(2, '0')
//     };

//     const response = await fetch(PERSONALIZATION_CONFIG.apiUrl, {
//       method: 'POST',
//       headers: {
//         'Accept': '*/*',
//         'Content-Type': 'application/json',
//         'Authorization': `Basic ${PERSONALIZATION_CONFIG.authToken}`,
//         'MOE-APPKEY': PERSONALIZATION_CONFIG.appKey
//       },
//       body: JSON.stringify(payload)
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log('✅ Personalization response:', data);
//     return data;
    
//   } catch (error) {
//     console.error('❌ Personalization error:', error);
//     return null;
//   }
// };

// /**
//  * Get user's IP address
//  */
// const getUserIP = async () => {
//   try {
//     const response = await fetch('https://api.ipify.org?format=json');
//     const data = await response.json();
//     return data.ip;
//   } catch (error) {
//     return '127.0.0.1'; // Fallback IP
//   }
// };

// /**
//  * Track impression event
//  */
// export const trackImpression = (experienceKey, variationId) => {
//   if (window.Moengage) {
//     window.Moengage.track_event('personalization_impression', {
//       experience_key: experienceKey,
//       variation_id: variationId,
//       timestamp: new Date().toISOString()
//     });
//     console.log('✅ Tracked impression for:', experienceKey);
//   }
// };

// /**
//  * Track click event
//  */
// export const trackClick = (experienceKey, variationId, elementId) => {
//   if (window.Moengage) {
//     window.Moengage.track_event('personalization_click', {
//       experience_key: experienceKey,
//       variation_id: variationId,
//       element_id: elementId,
//       timestamp: new Date().toISOString()
//     });
//     console.log('✅ Tracked click for:', experienceKey, elementId);
//   }
// };