// // // src/pages/join.jsx

// // import React, { useState } from "react";
// // import { useNavigate } from 'react-router-dom';
// // import { GoogleLogin } from '@react-oauth/google';

// // // 🎯 Fixed MoEngage Helper Function
// // const moEngageLogin = async (userId, userInfo = {}) => {
// //   if (window.Moengage) {
// //     try {
// //       // Set unique user ID first
// //       await window.Moengage.add_unique_user_id(userId);
      
// //       // Use only existing MoEngage methods
// //       if (userInfo.email) await window.Moengage.add_email(userInfo.email);
// //       if (userInfo.mobile) await window.Moengage.add_mobile(userInfo.mobile);
// //       if (userInfo.firstName) await window.Moengage.add_first_name(userInfo.firstName);
// //       if (userInfo.lastName) await window.Moengage.add_last_name(userInfo.lastName);
// //       if (userInfo.birthday) await window.Moengage.add_birthday(userInfo.birthday);
// //       if (userInfo.gender) await window.Moengage.add_gender(userInfo.gender);
      
// //       // Use add_user_attribute for full name
// //       if (userInfo.name) {
// //         try {
// //           await window.Moengage.add_user_attribute('u_n', userInfo.name);
// //         } catch (nameError) {
// //           // Fallback method
// //           if (window.Moengage.setUserAttribute) {
// //             await window.Moengage.setUserAttribute('u_n', userInfo.name);
// //           }
// //         }
// //       }
      
// //       console.log('✅ MoEngage user attributes sent successfully:', {
// //         userId,
// //         email: userInfo.email,
// //         mobile: userInfo.mobile,
// //         firstName: userInfo.firstName,
// //         lastName: userInfo.lastName,
// //         name: userInfo.name,
// //         birthday: userInfo.birthday,
// //         gender: userInfo.gender
// //       });
      
// //     } catch (error) {
// //       console.error('❌ MoEngage integration error:', error);
// //     }
// //   } else {
// //     console.warn('⚠️ MoEngage not initialized');
// //   }
// // };

// // // 🎯 Enhanced Google JWT Decoder with Better Error Handling
// // const decodeGoogleJWT = (token) => {
// //   try {
// //     console.log('🔍 Decoding Google JWT token...');
    
// //     if (!token) {
// //       throw new Error('No token provided');
// //     }
// //     console.log("parts:",token)
// //     const parts = token.split('.');
    
// //     if (parts.length !== 3) {
// //       throw new Error('Invalid JWT format');
// //     }
    
// //     const base64Url = parts[1];
// //     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
// //     // Add padding if needed
// //     const padding = '===='.substring(0, (4 - (base64.length % 4)) % 4);
// //     const paddedBase64 = base64 + padding;
    
// //     const jsonPayload = decodeURIComponent(
// //       atob(paddedBase64)
// //         .split('')
// //         .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
// //         .join('')
// //     );
    
// //     const decoded = JSON.parse(jsonPayload);
// //     console.log('✅ Successfully decoded Google JWT:', decoded);
// //     return decoded;
    
// //   } catch (error) {
// //     console.error('❌ Error decoding Google JWT:', error);
// //     console.error('Token received:', token);
// //     return null;
// //   }
// // };

// // export default function Join() {
// //   const navigate = useNavigate();
// //   const [isLogin, setIsLogin] = useState(true);
  
// //   // 🎯 Form State Management
// //   const [formData, setFormData] = useState({
// //     firstName: '',
// //     lastName: '',
// //     email: '',
// //     mobile: '',
// //     birthday: '',
// //     gender: '',
// //     password: '',
// //     confirmPassword: ''
// //   });

// //   const handleInputChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   // 🎯 Handle Email Login
// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //       console.log('Login attempt:', { email: formData.email });
// //       const userId = formData.email;
      
// //       await moEngageLogin(userId, { 
// //         email: formData.email
// //       });
      
// //       if (window.Moengage) {
// //         try {
// //           window.Moengage.track_event('user_login', {
// //             source: 'email_form',
// //             login_method: 'email'
// //           });
// //         } catch (trackError) {
// //           console.error('MoEngage tracking error:', trackError);
// //         }
// //       }
      
// //       localStorage.setItem('currentUser', JSON.stringify({
// //         id: userId,
// //         email: formData.email,
// //         loginMethod: 'email'
// //       }));
      
// //       alert('Login successful! 🎉');
// //       navigate('/home');
// //     } catch (error) {
// //       console.error('Login error:', error);
// //       alert('Login failed. Please try again.');
// //     }
// //   };

// //   // 🎯 Handle Registration
// //   const handleRegister = async (e) => {
// //     e.preventDefault();
    
// //     if (formData.password !== formData.confirmPassword) {
// //       alert('Passwords do not match!');
// //       return;
// //     }
    
// //     if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
// //       alert('Please fill all required fields!');
// //       return;
// //     }

// //     if (formData.mobile && !/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.mobile)) {
// //       alert('Please enter a valid mobile number!');
// //       return;
// //     }

// //     try {
// //       console.log('Registration attempt:', formData);
// //       const userId = formData.email;
// //       const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      
// //       await moEngageLogin(userId, { 
// //         email: formData.email,
// //         mobile: formData.mobile || null,
// //         firstName: formData.firstName,
// //         lastName: formData.lastName,
// //         name: fullName,
// //         birthday: formData.birthday || null,
// //         gender: formData.gender || null
// //       });
      
// //       if (window.Moengage) {
// //         try {
// //           window.Moengage.track_event('user_registered', {
// //             source: 'email_form',
// //             registration_method: 'email',
// //             user_email: formData.email,
// //             user_name: fullName,
// //             has_mobile: !!formData.mobile,
// //             has_birthday: !!formData.birthday,
// //             gender: formData.gender || 'not_specified'
// //           });
// //         } catch (trackError) {
// //           console.error('MoEngage tracking error:', trackError);
// //         }
// //       }
      
// //       localStorage.setItem('currentUser', JSON.stringify({
// //         id: userId,
// //         firstName: formData.firstName,
// //         lastName: formData.lastName,
// //         name: fullName,
// //         email: formData.email,
// //         mobile: formData.mobile,
// //         birthday: formData.birthday,
// //         gender: formData.gender,
// //         loginMethod: 'email'
// //       }));
      
// //       alert('Account created successfully! 🎉');
// //       navigate('/home');
// //     } catch (error) {
// //       console.error('Registration error:', error);
// //       alert('Registration failed. Please try again.');
// //     }
// //   };

// //   // 🎯 Super Robust Google OAuth Success Handler
// //   const handleGoogleSuccess = async (credentialResponse) => {
// //     console.log('🚀 Google OAuth Success Response:', credentialResponse);
    
// //     try {
// //       // Check if we have the credential
// //       if (!credentialResponse?.credential) {
// //         throw new Error('No credential in response');
// //       }
      
// //       console.log('🔑 Processing Google credential...');
      
// //       const googleUser = decodeGoogleJWT(credentialResponse.credential);
      
// //       if (!googleUser) {
// //         throw new Error('Failed to decode Google user data');
// //       }
      
// //       // Extract user info with fallbacks
// //       const userInfo = {
// //         email: googleUser.email || '',
// //         name: googleUser.name || `${googleUser.given_name || ''} ${googleUser.family_name || ''}`.trim(),
// //         firstName: googleUser.given_name || '',
// //         lastName: googleUser.family_name || '',
// //         picture: googleUser.picture || '',
// //         sub: googleUser.sub || '' // Google user ID
// //       };
      
// //       console.log('👤 Processed Google user info:', userInfo);
      
// //       if (!userInfo.email) {
// //         throw new Error('No email found in Google account');
// //       }
      
// //       // Send to MoEngage
// //       console.log('📊 Sending to MoEngage...');
// //       await moEngageLogin(userInfo.email, {
// //         email: userInfo.email,
// //         name: userInfo.name,
// //         firstName: userInfo.firstName,
// //         lastName: userInfo.lastName
// //       });
      
// //       // Track event
// //       if (window.Moengage) {
// //         try {
// //           window.Moengage.track_event('user_login', {
// //             login_method: 'google',
// //             source: 'google_oauth',
// //             user_email: userInfo.email,
// //             user_name: userInfo.name,
// //             has_picture: !!userInfo.picture
// //           });
// //           console.log('✅ MoEngage event tracked');
// //         } catch (trackError) {
// //           console.error('❌ MoEngage tracking error:', trackError);
// //         }
// //       }
      
// //       // Store in localStorage
// //       const userData = {
// //         id: userInfo.email,
// //         email: userInfo.email,
// //         name: userInfo.name,
// //         firstName: userInfo.firstName,
// //         lastName: userInfo.lastName,
// //         picture: userInfo.picture,
// //         googleId: userInfo.sub,
// //         loginMethod: 'google'
// //       };
      
// //       localStorage.setItem('currentUser', JSON.stringify(userData));
// //       console.log('💾 User data stored:', userData);
      
// //       alert('Google login successful! Redirecting... 🚀');
// //       navigate('/home');
      
// //     } catch (error) {
// //       console.error('💥 Google login processing error:', error);
// //       console.error('Error stack:', error.stack);
      
// //       // User-friendly error messages
// //       let errorMessage = 'Google login failed. ';
// //       if (error.message.includes('decode')) {
// //         errorMessage += 'Unable to process Google account data.';
// //       } else if (error.message.includes('email')) {
// //         errorMessage += 'No email found in Google account.';
// //       } else {
// //         errorMessage += 'Please try again.';
// //       }
      
// //       alert(errorMessage);
      
// //       // Track failure
// //       if (window.Moengage) {
// //         try {
// //           window.Moengage.track_event('login_failed', {
// //             login_method: 'google',
// //             error_type: 'processing_error',
// //             error_message: error.message
// //           });
// //         } catch (trackError) {
// //           console.error('Failed to track error:', trackError);
// //         }
// //       }
// //     }
// //   };

// //   // 🎯 Enhanced Google Error Handler
// //   const handleGoogleError = () => {
// //     console.error('🚫 Google OAuth Error');
    
// //     if (window.Moengage) {
// //       try {
// //         window.Moengage.track_event('login_failed', {
// //           login_method: 'google',
// //           error_type: 'google_oauth_error'
// //         });
// //       } catch (trackError) {
// //         console.error('Failed to track Google error:', trackError);
// //       }
// //     }
    
// //     alert('Google login failed. Please try again.');
// //   };

// //   return (
// //     <div
// //       className="min-h-screen flex items-center justify-center bg-gray-100 p-6"
// //       style={{
// //         backgroundImage: `url('https://images.unsplash.com/photo-1599643478518-a784e5dc9f03?q=80&w=1470&auto=format&fit=crop')`,
// //         backgroundSize: 'cover',
// //         backgroundPosition: 'center',
// //       }}
// //     >
// //       <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-md w-full border border-gray-200 transform hover:scale-[1.02] transition-transform duration-300">
        
// //         {/* Header */}
// //         <div className="text-center mb-6">
// //           <div className="text-5xl mb-2">
// //             {isLogin ? "💍" : "✨"}
// //           </div>
// //           <h1 className="text-3xl font-serif font-bold text-gray-800 mb-1">
// //             {isLogin ? "Welcome Back" : "Join Our Collection"}
// //           </h1>
// //           <p className="text-gray-500 text-sm">
// //             {isLogin
// //               ? "Sign in to explore luxury jewellery"
// //               : "Create your sparkling account"}
// //           </p>
// //         </div>

// //         {/* Google OAuth Button */}
// //         <div className="mb-6 flex justify-center">
// //           <GoogleLogin
// //             onSuccess={handleGoogleSuccess}
// //             onError={handleGoogleError}
// //             theme="outline"
// //             size="large"
// //             width={350}
// //             text={isLogin ? "signin_with" : "signup_with"}
// //             shape="rectangular"
// //             useOneTap={false}
// //             auto_select={false}
// //           />
// //         </div>

// //         {/* Divider */}
// //         <div className="flex items-center mb-6">
// //           <div className="flex-grow border-t border-gray-300"></div>
// //           <span className="flex-shrink-0 px-4 text-gray-500 text-sm">or continue with email</span>
// //           <div className="flex-grow border-t border-gray-300"></div>
// //         </div>

// //         {/* Form Container */}
// //         <div className="max-h-96 overflow-y-auto pr-2">
// //           <form 
// //             className="space-y-4"
// //             onSubmit={isLogin ? handleLogin : handleRegister}
// //           >
// //             {!isLogin && (
// //               <>
// //                 {/* Name Fields */}
// //                 <div className="grid grid-cols-2 gap-3">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       First Name *
// //                     </label>
// //                     <input
// //                       name="firstName"
// //                       value={formData.firstName}
// //                       onChange={handleInputChange}
// //                       type="text"
// //                       placeholder="John"
// //                       className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200 text-sm"
// //                       required
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       Last Name *
// //                     </label>
// //                     <input
// //                       name="lastName"
// //                       value={formData.lastName}
// //                       onChange={handleInputChange}
// //                       type="text"
// //                       placeholder="Doe"
// //                       className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200 text-sm"
// //                       required
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* Mobile Number */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// //                     Mobile Number
// //                   </label>
// //                   <input
// //                     name="mobile"
// //                     value={formData.mobile}
// //                     onChange={handleInputChange}
// //                     type="tel"
// //                     placeholder="+1 (555) 123-4567"
// //                     className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200"
// //                   />
// //                 </div>

// //                 {/* Birthday & Gender */}
// //                 <div className="grid grid-cols-2 gap-3">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       Birthday
// //                     </label>
// //                     <input
// //                       name="birthday"
// //                       value={formData.birthday}
// //                       onChange={handleInputChange}
// //                       type="date"
// //                       className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200 text-sm"
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">
// //                       Gender
// //                     </label>
// //                     <select
// //                       name="gender"
// //                       value={formData.gender}
// //                       onChange={handleInputChange}
// //                       className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200 text-sm"
// //                     >
// //                       <option value="">Select</option>
// //                       <option value="male">Male</option>
// //                       <option value="female">Female</option>
// //                       <option value="other">Other</option>
// //                       <option value="prefer_not_to_say">Prefer not to say</option>
// //                     </select>
// //                   </div>
// //                 </div>
// //               </>
// //             )}

// //             {/* Email */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Email Address *
// //               </label>
// //               <input
// //                 name="email"
// //                 value={formData.email}
// //                 onChange={handleInputChange}
// //                 type="email"
// //                 placeholder="you@example.com"
// //                 className="w-full p-4 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200"
// //                 required
// //               />
// //             </div>

// //             {/* Password */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Password *
// //               </label>
// //               <input
// //                 name="password"
// //                 value={formData.password}
// //                 onChange={handleInputChange}
// //                 type="password"
// //                 placeholder="••••••••"
// //                 className="w-full p-4 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200"
// //                 required
// //               />
// //             </div>

// //             {/* Confirm Password */}
// //             {!isLogin && (
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                   Confirm Password *
// //                 </label>
// //                 <input
// //                   name="confirmPassword"
// //                   value={formData.confirmPassword}
// //                   onChange={handleInputChange}
// //                   type="password"
// //                   placeholder="••••••••"
// //                   className="w-full p-4 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200"
// //                   required
// //                 />
// //               </div>
// //             )}

// //             <button
// //               type="submit"
// //               className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
// //             >
// //               {isLogin ? "Sign In ✨" : "Create Account 💎"}
// //             </button>
// //           </form>
// //         </div>

// //         {/* Toggle Between Login/Register */}
// //         <div className="mt-6 text-center">
// //           <p className="text-gray-500 text-sm mb-2">
// //             {isLogin ? "New here?" : "Already a member?"}
// //           </p>
// //           <button
// //             type="button"
// //             onClick={() => {
// //               setIsLogin(!isLogin);
// //               setFormData({
// //                 firstName: '',
// //                 lastName: '',
// //                 email: '',
// //                 mobile: '',
// //                 birthday: '',
// //                 gender: '',
// //                 password: '',
// //                 confirmPassword: ''
// //               });
// //             }}
// //             className="text-purple-600 hover:text-purple-800 font-semibold text-sm border-b-2 border-transparent hover:border-purple-400 transition-all duration-200"
// //           >
// //             {isLogin ? "Create Account" : "Sign In"}
// //           </button>
// //         </div>

// //         <div className="mt-4 text-center">
// //           <p className="text-xs text-gray-400">
// //             By continuing, you agree to our Terms & Privacy Policy
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // src/pages/join.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
// import moengage from "@moengage/web-sdk"; // ✅ Import NPM SDK instance

// // ✅ MoEngage Helper Function (NPM SDK version)
// const moEngageLogin = (userId, userInfo = {}) => {
//   try {
//     // Set unique user ID first
//     moengage.add_unique_user_id(userId);

//     // MoEngage attributes
//     if (userInfo.email) moengage.add_email(userInfo.email);
//     if (userInfo.mobile) moengage.add_mobile(userInfo.mobile);
//     if (userInfo.firstName) moengage.add_first_name(userInfo.firstName);
//     if (userInfo.lastName) moengage.add_last_name(userInfo.lastName);
//     if (userInfo.birthday) moengage.add_birthday(userInfo.birthday);
//     if (userInfo.gender) moengage.add_gender(userInfo.gender);

//     // Full name as custom attribute
//     if (userInfo.name) {
//       moengage.add_user_attribute("full_name", userInfo.name);
//     }

//     console.log("✅ MoEngage user attributes sent:", { userId, ...userInfo });
//   } catch (error) {
//     console.error("❌ MoEngage error:", error);
//   }
// };

// // ✅ Google JWT decoder
// const decodeGoogleJWT = (token) => {
//   try {
//     if (!token) throw new Error("No token provided");

//     const parts = token.split(".");
//     if (parts.length !== 3) throw new Error("Invalid JWT format");

//     const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
//     const padding = "=".repeat((4 - (base64.length % 4)) % 4);
//     const decodedJson = atob(base64 + padding);
//     return JSON.parse(decodedJson);
//   } catch (err) {
//     console.error("❌ JWT decode error:", err);
//     return null;
//   }
// };

// export default function Join() {
//   const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     mobile: "",
//     birthday: "",
//     gender: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Email Login
//   const handleLogin = (e) => {
//     e.preventDefault();
//     const userId = formData.email;

//     moEngageLogin(userId, { email: formData.email });
//     moengage.track_event("user_login", {
//       source: "email_form",
//       login_method: "email",
//     });

//     localStorage.setItem(
//       "currentUser",
//       JSON.stringify({ id: userId, email: formData.email, loginMethod: "email" })
//     );

//     alert("Login successful! 🎉");
//     navigate("/home");
//   };

//   // ✅ Registration
//   const handleRegister = (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       return alert("Passwords do not match!");
//     }
//     if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
//       return alert("Please fill all required fields!");
//     }
//     if (formData.mobile && !/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.mobile)) {
//       return alert("Invalid mobile number");
//     }

//     const userId = formData.email;
//     const fullName = `${formData.firstName} ${formData.lastName}`.trim();

//     moEngageLogin(userId, {
//       email: formData.email,
//       mobile: formData.mobile || null,
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       name: fullName,
//       birthday: formData.birthday || null,
//       gender: formData.gender || null,
//     });

//     moengage.track_event("user_registered", {
//       source: "email_form",
//       registration_method: "email",
//       user_email: formData.email,
//       user_name: fullName,
//       has_mobile: !!formData.mobile,
//       has_birthday: !!formData.birthday,
//       gender: formData.gender || "not_specified",
//     });

//     localStorage.setItem(
//       "currentUser",
//       JSON.stringify({
//         id: userId,
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         name: fullName,
//         email: formData.email,
//         mobile: formData.mobile,
//         birthday: formData.birthday,
//         gender: formData.gender,
//         loginMethod: "email",
//       })
//     );

//     alert("Account created! 🎉");
//     navigate("/home");
//   };

//   // ✅ Google OAuth
//   const handleGoogleSuccess = (credentialResponse) => {
//     if (!credentialResponse?.credential) {
//       return alert("Google login failed");
//     }
//     const googleUser = decodeGoogleJWT(credentialResponse.credential);
//     if (!googleUser?.email) {
//       return alert("No email in Google account");
//     }

//     const userInfo = {
//       email: googleUser.email,
//       name: googleUser.name || `${googleUser.given_name} ${googleUser.family_name}`.trim(),
//       firstName: googleUser.given_name || "",
//       lastName: googleUser.family_name || "",
//       picture: googleUser.picture || "",
//       sub: googleUser.sub || "",
//     };

//     moEngageLogin(userInfo.email, {
//       email: userInfo.email,
//       name: userInfo.name,
//       firstName: userInfo.firstName,
//       lastName: userInfo.lastName,
//     });

//     moengage.track_event("user_login", {
//       login_method: "google",
//       source: "google_oauth",
//       user_email: userInfo.email,
//       user_name: userInfo.name,
//       has_picture: !!userInfo.picture,
//     });

//     localStorage.setItem("currentUser", JSON.stringify({ ...userInfo, loginMethod: "google" }));

//     alert("Google login successful! 🚀");
//     navigate("/home");
//   };

//   const handleGoogleError = () => {
//     alert("Google login failed");
//     moengage.track_event("login_failed", {
//       login_method: "google",
//       error_type: "google_oauth_error",
//     });
//   };

//   return (

//     <div
//       className="min-h-screen flex items-center justify-center bg-gray-100 p-6"
//       style={{
//         backgroundImage: `url('https://images.unsplash.com/photo-1599643478518-a784e5dc9f03?q=80&w=1470&auto=format&fit=crop')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-md w-full border border-gray-200 transform hover:scale-[1.02] transition-transform duration-300">
        
//         {/* Header */}
//         <div className="text-center mb-6">
//           <div className="text-5xl mb-2">
//             {isLogin ? "💍" : "✨"}
//           </div>
//           <h1 className="text-3xl font-serif font-bold text-gray-800 mb-1">
//             {isLogin ? "Welcome Back" : "Join Our Collection"}
//           </h1>
//           <p className="text-gray-500 text-sm">
//             {isLogin
//               ? "Sign in to explore luxury jewellery"
//               : "Create your sparkling account"}
//           </p>
//         </div>

//         {/* Google OAuth Button */}
//         <div className="mb-6 flex justify-center">
//           <GoogleLogin
//             onSuccess={handleGoogleSuccess}
//             onError={handleGoogleError}
//             theme="outline"
//             size="large"
//             width={350}
//             text={isLogin ? "signin_with" : "signup_with"}
//             shape="rectangular"
//             useOneTap={false}
//             auto_select={false}
//           />
//         </div>

//         {/* Divider */}
//         <div className="flex items-center mb-6">
//           <div className="flex-grow border-t border-gray-300"></div>
//           <span className="flex-shrink-0 px-4 text-gray-500 text-sm">or continue with email</span>
//           <div className="flex-grow border-t border-gray-300"></div>
//         </div>

//         {/* Form Container */}
//         <div className="max-h-96 overflow-y-auto pr-2">
//           <form 
//             className="space-y-4"
//             onSubmit={isLogin ? handleLogin : handleRegister}
//           >
//             {!isLogin && (
//               <>
//                 {/* Name Fields */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       First Name *
//                     </label>
//                     <input
//                       name="firstName"
//                       value={formData.firstName}
//                       onChange={handleInputChange}
//                       type="text"
//                       placeholder="John"
//                       className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200 text-sm"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Last Name *
//                     </label>
//                     <input
//                       name="lastName"
//                       value={formData.lastName}
//                       onChange={handleInputChange}
//                       type="text"
//                       placeholder="Doe"
//                       className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200 text-sm"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Mobile Number */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Mobile Number
//                   </label>
//                   <input
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleInputChange}
//                     type="tel"
//                     placeholder="+1 (555) 123-4567"
//                     className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200"
//                   />
//                 </div>

//                 {/* Birthday & Gender */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Birthday
//                     </label>
//                     <input
//                       name="birthday"
//                       value={formData.birthday}
//                       onChange={handleInputChange}
//                       type="date"
//                       className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200 text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Gender
//                     </label>
//                     <select
//                       name="gender"
//                       value={formData.gender}
//                       onChange={handleInputChange}
//                       className="w-full p-3 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200 text-sm"
//                     >
//                       <option value="">Select</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                       <option value="other">Other</option>
//                       <option value="prefer_not_to_say">Prefer not to say</option>
//                     </select>
//                   </div>
//                 </div>
//               </>
//             )}

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address *
//               </label>
//               <input
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 type="email"
//                 placeholder="you@example.com"
//                 className="w-full p-4 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Password *
//               </label>
//               <input
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 type="password"
//                 placeholder="••••••••"
//                 className="w-full p-4 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200"
//                 required
//               />
//             </div>

//             {/* Confirm Password */}
//             {!isLogin && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Confirm Password *
//                 </label>
//                 <input
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   type="password"
//                   placeholder="••••••••"
//                   className="w-full p-4 rounded-xl border border-gray-300 bg-white focus:border-purple-400 focus:ring-1 focus:ring-purple-200 outline-none transition-all duration-200"
//                   required
//                 />
//               </div>
//             )}

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
//             >
//               {isLogin ? "Sign In ✨" : "Create Account 💎"}
//             </button>
//           </form>
//         </div>

//         {/* Toggle Between Login/Register */}
//         <div className="mt-6 text-center">
//           <p className="text-gray-500 text-sm mb-2">
//             {isLogin ? "New here?" : "Already a member?"}
//           </p>
//           <button
//             type="button"
//             onClick={() => {
//               setIsLogin(!isLogin);
//               setFormData({
//                 firstName: '',
//                 lastName: '',
//                 email: '',
//                 mobile: '',
//                 birthday: '',
//                 gender: '',
//                 password: '',
//                 confirmPassword: ''
//               });
//             }}
//             className="text-purple-600 hover:text-purple-800 font-semibold text-sm border-b-2 border-transparent hover:border-purple-400 transition-all duration-200"
//           >
//             {isLogin ? "Create Account" : "Sign In"}
//           </button>
//         </div>

//         <div className="mt-4 text-center">
//           <p className="text-xs text-gray-400">
//             By continuing, you agree to our Terms & Privacy Policy
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import moengage from "@moengage/web-sdk"; // ✅ Import NPM SDK instance

// ✅ Google JWT decoder (unchanged)
const decodeGoogleJWT = (token) => {
  try {
    if (!token) throw new Error("No token provided");
    const parts = token.split(".");
    if (parts.length !== 3) throw new Error("Invalid JWT format");
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (base64.length % 4)) % 4);
    const decodedJson = atob(base64 + padding);
    return JSON.parse(decodedJson);
  } catch (err) {
    console.error("❌ JWT decode error:", err);
    return null;
  }
};

export default function Join() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    birthday: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Email Login (NO MoEngage here)
  const handleLogin = (e) => {
    e.preventDefault();
    const userId = formData.email;

    // Store user data to be picked up in Home.jsx
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ id: userId, email: formData.email, loginMethod: "email" })
    );
    alert("Login successful! 🎉");
    navigate("/home");
  };

  // ✅ Registration (NO MoEngage here)
  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      return alert("Please fill all required fields!");
    }
    if (formData.mobile && !/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.mobile)) {
      return alert("Invalid mobile number");
    }

    const userId = formData.email;
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    // Store only for later use
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: fullName,
        email: formData.email,
        mobile: formData.mobile,
        birthday: formData.birthday,
        gender: formData.gender,
        loginMethod: "email",
      })
    );

    alert("Account created! 🎉");
    navigate("/home");
  };

  // ✅ Google OAuth (NO MoEngage)
  const handleGoogleSuccess = (credentialResponse) => {
    if (!credentialResponse?.credential) {
      return alert("Google login failed");
    }
    const googleUser = decodeGoogleJWT(credentialResponse.credential);
    if (!googleUser?.email) {
      return alert("No email in Google account");
    }
    const userInfo = {
      email: googleUser.email,
      name: googleUser.name || `${googleUser.given_name} ${googleUser.family_name}`.trim(),
      firstName: googleUser.given_name || "",
      lastName: googleUser.family_name || "",
      picture: googleUser.picture || "",
      sub: googleUser.sub || "",
    };

    localStorage.setItem("currentUser", JSON.stringify({ ...userInfo, loginMethod: "google" }));
    alert("Google login successful! 🚀");
    navigate("/home");
  };

  const handleGoogleError = () => {
    alert("Google login failed");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 p-6"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1599643478518-a784e5dc9f03?q=80&w=1470&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-md w-full border border-gray-200 transform hover:scale-[1.02] transition-transform duration-300">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">
            {isLogin ? "💍" : "✨"}
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-1">
            {isLogin ? "Welcome Back" : "Join Our Collection"}
          </h1>
          <p className="text-gray-500 text-sm">
            {isLogin
              ? "Sign in to explore luxury jewellery"
              : "Create your sparkling account"}
          </p>
        </div>

        {/* Google OAuth Button */}
        <div className="mb-6 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="outline"
            size="large"
            width={350}
            text={isLogin ? "signin_with" : "signup_with"}
            shape="rectangular"
            useOneTap={false}
            auto_select={false}
          />
        </div>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink-0 px-4 text-gray-500 text-sm">or continue with email</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Form */}
        <div className="max-h-96 overflow-y-auto pr-2">
          <form 
            className="space-y-4"
            onSubmit={isLogin ? handleLogin : handleRegister}
          >
            {!isLogin && (
              <>
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="John"
                      className="w-full p-3 rounded-xl border border-gray-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Doe"
                      className="w-full p-3 rounded-xl border border-gray-300"
                      required
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full p-3 rounded-xl border border-gray-300"
                  />
                </div>

                {/* Birthday & Gender */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Birthday
                    </label>
                    <input
                      name="birthday"
                      value={formData.birthday}
                      onChange={handleInputChange}
                      type="date"
                      className="w-full p-3 rounded-xl border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-gray-300"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                placeholder="you@example.com"
                className="w-full p-4 rounded-xl border border-gray-300"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                type="password"
                placeholder="••••••••"
                className="w-full p-4 rounded-xl border border-gray-300"
                required
              />
            </div>

            {/* Confirm Password */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-4 rounded-xl border border-gray-300"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg"
            >
              {isLogin ? "Sign In ✨" : "Create Account 💎"}
            </button>
          </form>
        </div>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm mb-2">
            {isLogin ? "New here?" : "Already a member?"}
          </p>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                mobile: '',
                birthday: '',
                gender: '',
                password: '',
                confirmPassword: ''
              });
            }}
            className="text-purple-600 hover:text-purple-800 font-semibold text-sm"
          >
            {isLogin ? "Create Account" : "Sign In"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}