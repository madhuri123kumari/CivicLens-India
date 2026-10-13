

import { useEffect, useMemo, useState } from "react";

import "./App.css";

const UI_TRANSLATIONS = {
  "Home": "होम",
  "Services": "सेवाएँ",
  "Report Issue": "समस्या दर्ज करें",
  "Track Complaint": "शिकायत ट्रैक करें",
  "My Dashboard": "मेरा डैशबोर्ड",
  "AI Assistant": "AI सहायक",
  "Officer Portal": "अधिकारी पोर्टल",
  "About": "परिचय",
  "Sign in →": "लॉग इन करें →",
  "Sign in": "लॉग इन",
  "Sign up": "साइन अप",
  "Search civic services": "नागरिक सेवाएँ खोजें",
  "Search services, issues or information...": "सेवाएँ, समस्याएँ या जानकारी खोजें...",
  "Choose language": "भाषा चुनें",
  "Switch to light theme": "लाइट थीम करें",
  "Switch to dark theme": "डार्क थीम करें",
  "A CITIZEN-FIRST PLATFORM FOR INDIA": "भारत के नागरिकों के लिए एक मंच",
  "Cleaner Cities": "स्वच्छ शहर",
  "Stronger Communities": "मज़बूत समुदाय",
  "with ": "के साथ ",
  "Your Voice": "आपकी आवाज़",
  "Report civic issues, follow their progress and help build cleaner, safer and smarter communities.": "नागरिक समस्याएँ दर्ज करें, उनकी प्रगति देखें और स्वच्छ, सुरक्षित व बेहतर समुदाय बनाने में मदद करें।",
  "Report a Civic Issue →": "नागरिक समस्या दर्ज करें →",
  "Track a Complaint →": "शिकायत ट्रैक करें →",
  "Independent civic platform concept. Not an official Government of India website.": "स्वतंत्र नागरिक मंच का नमूना। यह भारत सरकार की आधिकारिक वेबसाइट नहीं है।",
  "CIVIC SERVICES": "नागरिक सेवाएँ",
  "What needs attention in your area?": "आपके क्षेत्र में किस समस्या पर ध्यान देना ज़रूरी है?",
  "Choose a category to report a local civic issue.": "स्थानीय नागरिक समस्या दर्ज करने के लिए श्रेणी चुनें।",
  "View all services →": "सभी सेवाएँ देखें →",
  "Roads & Infrastructure": "सड़कें और बुनियादी ढाँचा",
  "Potholes, damaged roads and unsafe streets.": "गड्ढे, क्षतिग्रस्त सड़कें और असुरक्षित गलियाँ।",
  "Water Supply": "जल आपूर्ति",
  "Water shortages, leaking pipes and drainage.": "पानी की कमी, पाइप में रिसाव और जल निकासी।",
  "Street Lighting": "स्ट्रीट लाइट",
  "Broken streetlights and public lighting.": "खराब स्ट्रीट लाइट और सार्वजनिक प्रकाश व्यवस्था।",
  "Waste Management": "कचरा प्रबंधन",
  "Garbage collection and cleanliness.": "कचरा संग्रह और साफ़-सफ़ाई।",
  "Environment": "पर्यावरण",
  "Pollution, trees and public spaces.": "प्रदूषण, पेड़ और सार्वजनिक स्थान।",
  "Other Civic Issues": "अन्य नागरिक समस्याएँ",
  "Other neighbourhood concerns.": "मोहल्ले की अन्य समस्याएँ।",
  "No matching services found. Try searching for roads, water or waste.": "कोई मिलती-जुलती सेवा नहीं मिली। सड़क, पानी या कचरा खोजें।",
  "CITIZEN PARTICIPATION": "नागरिक भागीदारी",
  "Report issues from anywhere in India": "भारत में कहीं से भी समस्या दर्ज करें",
  "Choose your State/UT and district to get started.": "शुरू करने के लिए अपना राज्य/केंद्र शासित प्रदेश और ज़िला चुनें।",
  "State / Union Territory": "राज्य / केंद्र शासित प्रदेश",
  "Select State / UT": "राज्य / केंद्र शासित प्रदेश चुनें",
  "Report Now →": "अभी रिपोर्ट करें →",
  "Complaint Tracking": "शिकायत ट्रैकिंग",
  "Look up the status of a complaint record.": "शिकायत की स्थिति देखें।",
  "Track Complaint →": "शिकायत ट्रैक करें →",
  "TRANSPARENCY BY DESIGN": "पारदर्शिता",
  "From reporting to resolution": "शिकायत दर्ज करने से समाधान तक",
  "A clear workflow for documenting and following civic issues.": "नागरिक समस्याओं को दर्ज करने और उनकी प्रगति देखने की सरल प्रक्रिया।",
  "Report": "रिपोर्ट करें",
  "Describe the issue and provide its location.": "समस्या का विवरण और स्थान दें।",
  "Review": "समीक्षा",
  "A future verified workflow can check and classify reports.": "भविष्य में सत्यापित प्रक्रिया रिपोर्ट की जाँच और वर्गीकरण कर सकती है।",
  "Track": "ट्रैक करें",
  "Follow status changes and the complaint timeline.": "स्थिति में बदलाव और शिकायत की समयरेखा देखें।",
  "Analyse": "विश्लेषण करें",
  "Use aggregated records to understand recurring issues.": "बार-बार होने वाली समस्याओं को समझने के लिए संकलित रिकॉर्ड का उपयोग करें।",
  "Services and issue categories": "सेवाएँ और समस्या श्रेणियाँ",
  "Select a service to open the complaint reporting form.": "शिकायत दर्ज करने का फ़ॉर्म खोलने के लिए सेवा चुनें।",
  "CITIZEN COMPLAINT PORTAL": "नागरिक शिकायत पोर्टल",
  "Report a civic issue": "नागरिक समस्या दर्ज करें",
  "Provide accurate details to create a local demonstration record.": "स्थानीय डेमो रिकॉर्ड बनाने के लिए सही जानकारी भरें।",
  "Prototype notice": "प्रोटोटाइप सूचना",
  "This form saves to this browser only. It does not send reports to a municipality, state government or government department.": "यह फ़ॉर्म केवल इसी ब्राउज़र में सेव होता है। यह नगर निकाय, राज्य सरकार या किसी सरकारी विभाग को रिपोर्ट नहीं भेजता।",
  "Full name": "पूरा नाम",
  "Email address": "ईमेल पता",
  "Phone number (optional)": "फ़ोन नंबर (वैकल्पिक)",
  "District / City": "ज़िला / शहर",
  "Enter district or city": "ज़िला या शहर दर्ज करें",
  "Preferred state language": "राज्य की पसंदीदा भाषा",
  "Select a state first": "पहले राज्य चुनें",
  "Issue category": "समस्या की श्रेणी",
  "Select category": "श्रेणी चुनें",
  "Street / location": "सड़क / स्थान",
  "Area, road or nearby landmark": "इलाका, सड़क या नज़दीकी पहचान-चिह्न",
  "Geographic location": "भौगोलिक स्थान",
  "Location sharing is optional. Your browser will ask permission.": "स्थान साझा करना वैकल्पिक है। आपका ब्राउज़र अनुमति माँगेगा।",
  "Use my location": "मेरी लोकेशन इस्तेमाल करें",
  "Describe the issue": "समस्या का विवरण दें",
  "Describe what happened, where it happened and why attention is needed.": "बताएँ कि क्या हुआ, कहाँ हुआ और ध्यान देना क्यों ज़रूरी है।",
  "Upload supporting photo (optional, maximum 1 MB)": "सहायक फ़ोटो अपलोड करें (वैकल्पिक, अधिकतम 1 MB)",
  "Remove photo": "फ़ोटो हटाएँ",
  "Create Local Demo Record →": "स्थानीय डेमो रिकॉर्ड बनाएँ →",
  "Cancel": "रद्द करें",
  "COMPLAINT STATUS": "शिकायत की स्थिति",
  "Track a complaint": "शिकायत ट्रैक करें",
  "Enter the reference ID generated when a record was saved in this browser.": "इस ब्राउज़र में रिकॉर्ड सेव होने पर मिली संदर्भ आईडी दर्ज करें।",
  "Find your complaint": "अपनी शिकायत खोजें",
  "Complaint reference number": "शिकायत संदर्भ संख्या",
  "Check Status →": "स्थिति जाँचें →",
  "Complaint timeline": "शिकायत की समयरेखा",
  "CITIZEN DASHBOARD": "नागरिक डैशबोर्ड",
  "My complaints": "मेरी शिकायतें",
  "View and manage the complaint records saved in this browser.": "इस ब्राउज़र में सेव शिकायत रिकॉर्ड देखें और प्रबंधित करें।",
  "Total records": "कुल रिकॉर्ड",
  "Submitted": "जमा की गई",
  "In progress": "प्रगति पर",
  "Resolved": "समाधान हो गया",
  "Complaint history": "शिकायत इतिहास",
  "These records are not synchronized with any server.": "ये रिकॉर्ड किसी सर्वर से सिंक्रोनाइज़ नहीं हैं।",
  "No complaints yet": "अभी कोई शिकायत नहीं",
  "Create your first local demo record using the complaint form.": "शिकायत फ़ॉर्म से अपना पहला स्थानीय डेमो रिकॉर्ड बनाएँ।",
  "Report an issue": "समस्या दर्ज करें",
  "OFFICER PORTAL PREVIEW": "अधिकारी पोर्टल का पूर्वावलोकन",
  "Complaint operations": "शिकायत प्रबंधन",
  "Demonstration interface for reviewing locally saved records.": "स्थानीय रूप से सेव रिकॉर्ड देखने के लिए डेमो इंटरफ़ेस।",
  "Not a secure officer portal": "यह सुरक्षित अधिकारी पोर्टल नहीं है",
  "Search records": "रिकॉर्ड खोजें",
  "Filter status": "स्थिति फ़िल्टर करें",
  "No matching records": "कोई मिलते-जुलते रिकॉर्ड नहीं",
  "Create a demo complaint or adjust your filters.": "डेमो शिकायत बनाएँ या फ़िल्टर बदलें।",
  "Create demo complaint": "डेमो शिकायत बनाएँ",
  "CIVIC ASSISTANT": "नागरिक सहायक",
  "How can we help?": "हम आपकी कैसे मदद कर सकते हैं?",
  "CivicLens Assistant": "CivicLens सहायक",
  "Ask a civic question": "नागरिक समस्या से जुड़ा सवाल पूछें",
  "Enter your question": "अपना सवाल दर्ज करें",
  "Type your civic question...": "अपना नागरिक सवाल लिखें...",
  "Send →": "भेजें →",
  "ABOUT CIVICLENS INDIA": "CivicLens India के बारे में",
  "A citizen-first civic platform concept": "नागरिक-केंद्रित मंच की अवधारणा",
  "Citizen participation": "नागरिक भागीदारी",
  "Transparent tracking": "पारदर्शी ट्रैकिंग",
  "Responsible AI": "ज़िम्मेदार AI",
  "Project status": "परियोजना की स्थिति",
  "PREFERENCES": "प्राथमिकताएँ",
  "Settings": "सेटिंग्स",
  "Dark appearance": "डार्क मोड",
  "Change the appearance of this prototype.": "इस प्रोटोटाइप का रूप बदलें।",
  "Switch to light": "लाइट मोड करें",
  "Switch to dark": "डार्क मोड करें",
  "Interface language": "इंटरफ़ेस भाषा",
  "English": "English",
  "Hindi": "हिन्दी",
  "Password": "पासवर्ड",
  "Forgot password?": "पासवर्ड भूल गए?",
  "Continue with DigiLocker": "DigiLocker के साथ जारी रखें",
  "Hide": "छिपाएँ",
  "Show": "दिखाएँ",
  "OR": "या",
  "Date unavailable": "तारीख उपलब्ध नहीं",
  "Delete local record": "स्थानीय रिकॉर्ड हटाएँ",
  "View tracking →": "ट्रैकिंग देखें →",
  "with": "के साथ",
  "⚑ Report a Civic Issue →": "⚑ नागरिक समस्या दर्ज करें →",
  "⌕ Track a Complaint →": "⌕ शिकायत ट्रैक करें →",
  "Report a Civic Issue": "नागरिक समस्या दर्ज करें",
  "Track a Complaint": "शिकायत ट्रैक करें",
  "Government of India": "भारत सरकार",
  "Independent Civic Platform Concept": "स्वतंत्र नागरिक मंच की अवधारणा",
  "Full name *": "पूरा नाम *",
  "Email address *": "ईमेल पता *",
  "State / Union Territory *": "राज्य / केंद्र शासित प्रदेश *",
  "District / City *": "ज़िला / शहर *",
  "Issue category *": "समस्या की श्रेणी *",
  "Street / location *": "सड़क / स्थान *",
  "⌖ Use my location": "⌖ मेरी लोकेशन इस्तेमाल करें",
  "Describe the issue *": "समस्या का विवरण दें *",
  "+ Report an issue": "+ समस्या दर्ज करें",
  "Role-based access control and officer authentication are not connected. Changes on this screen affect local demo records only.": "भूमिका-आधारित पहुँच और अधिकारी प्रमाणीकरण जुड़े नहीं हैं। इस स्क्रीन पर किए गए बदलाव केवल स्थानीय डेमो रिकॉर्ड पर लागू होते हैं।",
  "Reference, category, location...": "संदर्भ, श्रेणी, स्थान...",
  "Demo status": "डेमो स्थिति",
  "Explore the assistant interface. AI-generated answers are not enabled in this frontend stage.": "सहायक इंटरफ़ेस देखें। इस फ्रंटएंड चरण में AI-जनित उत्तर सक्षम नहीं हैं।",
  "Designed for civic issue guidance and platform navigation.": "नागरिक समस्याओं के मार्गदर्शन और वेबसाइट पर नेविगेशन के लिए बनाया गया।",
  "AI connection pending": "AI कनेक्शन बाकी है",
  "This interface does not yet call an AI model or external service.": "यह इंटरफ़ेस अभी किसी AI मॉडल या बाहरी सेवा से जुड़ा नहीं है।",
  "Try asking how to report a pothole, track a local record, or navigate the CivicLens demo.": "पूछें कि सड़क का गड्ढा कैसे रिपोर्ट करें, स्थानीय रिकॉर्ड कैसे ट्रैक करें या CivicLens डेमो कैसे इस्तेमाल करें।",
  "You": "आप",
  "About CivicLens India": "CivicLens India के बारे में",
  "Toggle appearance": "थीम बदलें",
  "Toggle navigation": "नेविगेशन खोलें या बंद करें",
  "Search": "खोजें",
  "Coordinates:": "निर्देशांक:",
  "Created:": "बनाया गया:",
  "Last updated:": "आखिरी बार अपडेट:",
  "Reference:": "संदर्भ:",
  "Submitted:": "जमा किया गया:",
  "e.g. CL-...": "उदाहरण: CL-...",
  "All": "सभी",
  "Assigned": "सौंपा गया",
  "In Progress": "प्रगति पर",
  "Select a valid image file.": "मान्य इमेज फ़ाइल चुनें।",
  "For this browser demo, select an image smaller than 1 MB.": "इस ब्राउज़र डेमो के लिए 1 MB से छोटी इमेज चुनें।",
  "Photo selected. It will be stored with this local demo record.": "फ़ोटो चुन ली गई है। यह स्थानीय डेमो रिकॉर्ड के साथ सेव होगी।",
  "Unable to read the selected photo.": "चुनी गई फ़ोटो पढ़ी नहीं जा सकी।",
  "Location services are not supported by this browser.": "यह ब्राउज़र लोकेशन सेवा का समर्थन नहीं करता।",
  "Requesting location permission...": "लोकेशन की अनुमति माँगी जा रही है...",
  "Location captured. Please confirm the location details.": "लोकेशन मिल गई। कृपया स्थान की जानकारी की पुष्टि करें।",
  "Location permission denied. You can enter the address manually.": "लोकेशन की अनुमति नहीं मिली। आप पता स्वयं दर्ज कर सकते हैं।",
  "Unable to get location. Please enter the address manually.": "लोकेशन नहीं मिल सकी। कृपया पता स्वयं दर्ज करें।",
  "Describe the issue using at least 20 characters.": "समस्या का विवरण कम से कम 20 अक्षरों में लिखें।",
  "Unable to save the record. Browser storage may be full. Try removing the photo.": "रिकॉर्ड सेव नहीं हो सका। ब्राउज़र स्टोरेज भर सकता है। फ़ोटो हटाकर प्रयास करें।",
  "Complaint record found in this browser.": "इस ब्राउज़र में शिकायत रिकॉर्ड मिल गया।",
  "No matching complaint found in this browser. Server-based tracking is not connected.": "इस ब्राउज़र में ऐसी शिकायत नहीं मिली। सर्वर-आधारित ट्रैकिंग जुड़ी नहीं है।",
  "Local demo status updated. No government system was contacted.": "स्थानीय डेमो स्थिति अपडेट हुई। किसी सरकारी सिस्टम से संपर्क नहीं किया गया।",
  "Local complaint record deleted.": "स्थानीय शिकायत रिकॉर्ड हटा दिया गया।",
  "Unable to update browser storage.": "ब्राउज़र स्टोरेज अपडेट नहीं हो सका।",
  "Signup UI validated. Account creation and email verification require the backend.": "साइन-अप फ़ॉर्म की जाँच हो गई। खाता बनाने और ईमेल सत्यापन के लिए बैकएंड आवश्यक है।",
  "Sign-in UI validated. Authentication is not connected yet.": "लॉग-इन फ़ॉर्म की जाँच हो गई। प्रमाणीकरण अभी जुड़ा नहीं है।",
  "DigiLocker integration pending. Official application approval, credentials, consent flow and secure backend are required.": "DigiLocker एकीकरण अभी बाकी है। इसके लिए आधिकारिक आवेदन की मंज़ूरी, क्रेडेंशियल, सहमति प्रक्रिया और सुरक्षित बैकएंड आवश्यक हैं।",
  "The CivicLens AI assistant interface is ready for integration. It is not connected to an AI model yet, so I cannot generate a verified answer. For a civic complaint, use Report Issue to create a local demo record.": "CivicLens AI सहायक इंटरफ़ेस एकीकरण के लिए तैयार है। यह अभी AI मॉडल से जुड़ा नहीं है, इसलिए सत्यापित उत्तर नहीं दे सकता। नागरिक शिकायत के लिए समस्या दर्ज करें और स्थानीय डेमो रिकॉर्ड बनाएँ।",
  "Local demo record created:": "स्थानीय डेमो रिकॉर्ड बनाया गया:",
  "It has not been submitted to a government department.": "इसे किसी सरकारी विभाग में जमा नहीं किया गया है।",
  "Delete this complaint record from this browser? This cannot be undone here.": "क्या इस ब्राउज़र से शिकायत रिकॉर्ड हटाना है? इसे यहाँ वापस नहीं लाया जा सकेगा।",

};

const STORAGE_KEYS = {

  complaints: "civiclens_complaints",

  theme: "civiclens_theme",

  preferences: "civiclens_preferences",

};

const STATES = [

  { name: "Andaman and Nicobar Islands", language: "Hindi" },

  { name: "Andhra Pradesh", language: "English" },

  { name: "Arunachal Pradesh", language: "English" },

  { name: "Assam", language: "English" },

  { name: "Bihar", language: "Hindi" },

  { name: "Chandigarh", language: "English" },

  { name: "Chhattisgarh", language: "Hindi" },

  { name: "Dadra and Nagar Haveli and Daman and Diu", language: "English" },

  { name: "Delhi (NCT)", language: "Hindi" },

  { name: "Goa", language: "English" },

  { name: "Gujarat", language: "English" },

  { name: "Haryana", language: "Hindi" },

  { name: "Himachal Pradesh", language: "Hindi" },

  { name: "Jammu and Kashmir", language: "English" },

  { name: "Jharkhand", language: "Hindi" },

  { name: "Karnataka", language: "English" },

  { name: "Kerala", language: "English" },

  { name: "Ladakh", language: "English" },

  { name: "Lakshadweep", language: "English" },

  { name: "Madhya Pradesh", language: "Hindi" },

  { name: "Maharashtra", language: "English" },

  { name: "Manipur", language: "English" },

  { name: "Meghalaya", language: "English" },

  { name: "Mizoram", language: "English" },

  { name: "Nagaland", language: "English" },

  { name: "Odisha", language: "English" },

  { name: "Puducherry", language: "English" },

  { name: "Punjab", language: "English" },

  { name: "Rajasthan", language: "Hindi" },

  { name: "Sikkim", language: "English" },

  { name: "Tamil Nadu", language: "English" },

  { name: "Telangana", language: "English" },

  { name: "Tripura", language: "English" },

  { name: "Uttar Pradesh", language: "Hindi" },

  { name: "Uttarakhand", language: "Hindi" },

  { name: "West Bengal", language: "English" },

].sort((a, b) => a.name.localeCompare(b.name));

const LANGUAGES = ["English", "Hindi"];

const SERVICES = [

  {

    id: "roads",

    icon: "▰",

    title: "Roads & Infrastructure",

    description: "Potholes, damaged roads and unsafe streets.",

    color: "blue",

  },

  {

    id: "water",

    icon: "●",

    title: "Water Supply",

    description: "Water shortages, leaking pipes and drainage.",

    color: "cyan",

  },

  {

    id: "lighting",

    icon: "☼",

    title: "Street Lighting",

    description: "Broken streetlights and public lighting.",

    color: "amber",

  },

  {

    id: "waste",

    icon: "▤",

    title: "Waste Management",

    description: "Garbage collection and cleanliness.",

    color: "green",

  },

  {

    id: "environment",

    icon: "♣",

    title: "Environment",

    description: "Pollution, trees and public spaces.",

    color: "forest",

  },

  {

    id: "other",

    icon: "⌂",

    title: "Other Civic Issues",

    description: "Other neighbourhood concerns.",

    color: "purple",

  },

];




const NAV_ITEMS = [

  { id: "home", label: "Home", icon: "⌂" },

  { id: "services", label: "Services", icon: "▦" },

  { id: "report", label: "Report Issue", icon: "✎" },

  { id: "track", label: "Track Complaint", icon: "⌕" },

  { id: "dashboard", label: "My Dashboard", icon: "▣" },

  { id: "assistant", label: "AI Assistant", icon: "✳" },

  { id: "officer", label: "Officer Portal", icon: "♙" },

  { id: "about", label: "About", icon: "ⓘ" },

];

function readStorage(key, fallback) {

  try {

    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : fallback;

  } catch {

    return fallback;

  }

}

function saveStorage(key, value) {

  try {

    localStorage.setItem(key, JSON.stringify(value));

    return true;

  } catch {

    return false;

  }

}

function newComplaintId() {

  return `CL-${Date.now().toString(36).toUpperCase()}`;

}

function formatDate(value) {

  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return date.toLocaleString("en-IN", {

    dateStyle: "medium",

    timeStyle: "short",

  });

}

function getStatusClass(status) {

  const value = (status || "").toLowerCase();

  if (value === "resolved") return "resolved";

  if (value === "in progress") return "in-progress";

  if (value === "assigned") return "assigned";

  return "submitted";

}


function translateDocument(language) {
  const toHindi = language === "Hindi";
  const reverse = Object.fromEntries(
    Object.entries(UI_TRANSLATIONS).map(([english, hindi]) => [hindi, english])
  );
  const dictionary = toHindi ? UI_TRANSLATIONS : reverse;

  const translateText = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return value;
    const translated = dictionary[trimmed];
    if (!translated) return value;
    const leading = value.match(/^\s*/)?.[0] || "";
    const trailing = value.match(/\s*$/)?.[0] || "";
    return `${leading}${translated}${trailing}`;
  };

  const walk = (root) => {
    if (root.nodeType === Node.TEXT_NODE) {
      const next = translateText(root.nodeValue || "");
      if (next !== root.nodeValue) root.nodeValue = next;
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    const element = root;
    for (const attr of ["placeholder", "title", "aria-label", "alt"]) {
      const current = element.getAttribute(attr);
      if (current) {
        const next = translateText(current);
        if (next !== current) element.setAttribute(attr, next);
      }
    }
    if (element.tagName === "OPTION") {
      const next = translateText(element.textContent || "");
      if (next !== element.textContent) element.textContent = next;
    }
    for (const child of Array.from(element.childNodes)) walk(child);
  };

  if (typeof document !== "undefined") {
    document.documentElement.lang = toHindi ? "hi" : "en";
    walk(document.body);
  }
}

function App() {

  const [activePage, setActivePage] = useState("home");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [language, setLanguage] = useState(() => {
    const saved = readStorage(STORAGE_KEYS.preferences, {});
    return saved.language === "Hindi" ? "Hindi" : "English";
  });

  useEffect(() => {
    translateDocument(language);
    const observer = new MutationObserver(() => translateDocument(language));
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "title", "aria-label", "alt"],
    });
    return () => observer.disconnect();
  }, [language]);

  const [selectedState, setSelectedState] = useState("");

  const [notice, setNotice] = useState("");

  const [darkMode, setDarkMode] = useState(

    () => readStorage(STORAGE_KEYS.theme, false)

  );

  const [complaints, setComplaints] = useState(() =>

    readStorage(STORAGE_KEYS.complaints, [])

  );

  const [trackingId, setTrackingId] = useState("");

  const [trackedComplaint, setTrackedComplaint] = useState(null);

  const [authOpen, setAuthOpen] = useState(false);

  const [authMode, setAuthMode] = useState("signup");

  const [showPassword, setShowPassword] = useState(false);

  const [authForm, setAuthForm] = useState({

    name: "",

    email: "",

    password: "",

  });

  const [reportForm, setReportForm] = useState({

    name: "",

    email: "",

    phone: "",

    state: "",

    district: "",

    category: "",

    address: "",

    description: "",

    photo: "",

    latitude: "",

    longitude: "",

  });

  const [assistantQuestion, setAssistantQuestion] = useState("");

  const [assistantMessages, setAssistantMessages] = useState([]);

  const [officerSearch, setOfficerSearch] = useState("");

  const [officerStatus, setOfficerStatus] = useState("All");

  const filteredServices = useMemo(() => {

    const query = search.trim().toLowerCase();

    if (!query) return SERVICES;

    return SERVICES.filter((service) =>

      `${service.title} ${service.description}`

        .toLowerCase()

        .includes(query)

    );

  }, [search]);

  const filteredOfficerComplaints = useMemo(() => {

    const query = officerSearch.trim().toLowerCase();

    return complaints.filter((item) => {

      const matchesQuery =

        !query ||

        `${item.id} ${item.category} ${item.state} ${item.district} ${item.description}`

          .toLowerCase()

          .includes(query);

      const matchesStatus =

        officerStatus === "All" || item.status === officerStatus;

      return matchesQuery && matchesStatus;

    });

  }, [complaints, officerSearch, officerStatus]);

  const complaintStats = useMemo(() => {

    return {

      total: complaints.length,

      submitted: complaints.filter((item) => item.status === "Submitted").length,

      assigned: complaints.filter((item) => item.status === "Assigned").length,

      inProgress: complaints.filter((item) => item.status === "In Progress").length,

      resolved: complaints.filter((item) => item.status === "Resolved").length,

    };

  }, [complaints]);

  function notify(message) {

    setNotice(message);

  }

  function navigate(page) {

    setActivePage(page);

    setMobileMenuOpen(false);

    setNotice("");

    window.scrollTo({ top: 0, behavior: "smooth" });

  }

  function updateReport(event) {

    const { name, value } = event.target;

    setReportForm((previous) => ({

      ...previous,

      [name]: value,

    }));

    if (name === "state") {

      setSelectedState(value);

      const state = STATES.find((item) => item.name === value);

      if (state) {

        const preferences = readStorage(STORAGE_KEYS.preferences, {});

        saveStorage(STORAGE_KEYS.preferences, {

          ...preferences,

          language,

          selectedState: value,

        });

      }

    }

  }

  function chooseService(category) {

    setReportForm((previous) => ({

      ...previous,

      category,

    }));

    navigate("report");

  }

  function getCurrentLocation() {

    if (!navigator.geolocation) {

      notify("Location services are not supported by this browser.");

      return;

    }

    notify("Requesting location permission...");

    navigator.geolocation.getCurrentPosition(

      (position) => {

        setReportForm((previous) => ({

          ...previous,

          latitude: String(position.coords.latitude),

          longitude: String(position.coords.longitude),

        }));

        notify("Location captured. Please confirm the location details.");

      },

      (error) => {

        const message =

          error.code === error.PERMISSION_DENIED

            ? "Location permission denied. You can enter the address manually."

            : "Unable to get location. Please enter the address manually.";

        notify(message);

      },

      {

        enableHighAccuracy: true,

        timeout: 10000,

        maximumAge: 60000,

      }

    );

  }

  function handlePhoto(event) {

    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

      notify("Select a valid image file.");

      event.target.value = "";

      return;

    }

    if (file.size > 1024 * 1024) {

      notify("For this browser demo, select an image smaller than 1 MB.");

      event.target.value = "";

      return;

    }

    const reader = new FileReader();

    reader.onload = () => {

      setReportForm((previous) => ({

        ...previous,

        photo: String(reader.result || ""),

      }));

      notify("Photo selected. It will be stored with this local demo record.");

    };

    reader.onerror = () => notify("Unable to read the selected photo.");

    reader.readAsDataURL(file);

  }

  function submitComplaint(event) {

    event.preventDefault();

    if (reportForm.description.trim().length < 20) {

      notify("Describe the issue using at least 20 characters.");

      return;

    }

    const complaint = {

      ...reportForm,

      id: newComplaintId(),

      name: reportForm.name.trim(),

      email: reportForm.email.trim(),

      district: reportForm.district.trim(),

      address: reportForm.address.trim(),

      description: reportForm.description.trim(),

      status: "Submitted",

      createdAt: new Date().toISOString(),

      history: [

        {

          status: "Submitted",

          date: new Date().toISOString(),

          note: "Complaint record created in this browser.",

        },

      ],

    };

    const updated = [complaint, ...complaints];

    if (!saveStorage(STORAGE_KEYS.complaints, updated)) {

      notify(

        "Unable to save the record. Browser storage may be full. Try removing the photo."

      );

      return;

    }

    setComplaints(updated);

    setTrackingId(complaint.id);

    setTrackedComplaint(complaint);

    setReportForm({

      name: "",

      email: "",

      phone: "",

      state: "",

      district: "",

      category: "",

      address: "",

      description: "",

      photo: "",

      latitude: "",

      longitude: "",

    });

    setSelectedState("");

    notify(

      `Local demo record created: ${complaint.id}. It has not been submitted to a government department.`

    );

    navigate("track");

  }

  function trackComplaint(event) {

    event.preventDefault();

    const id = trackingId.trim().toUpperCase();

    const found = complaints.find(

      (item) => item.id.toUpperCase() === id

    );

    setTrackedComplaint(found || null);

    notify(

      found

        ? "Complaint record found in this browser."

        : "No matching complaint found in this browser. Server-based tracking is not connected."

    );

  }

  function updateLocalStatus(complaintId, newStatus) {

    const updated = complaints.map((item) => {

      if (item.id !== complaintId) return item;

      const history = [

        ...(item.history || []),

        {

          status: newStatus,

          date: new Date().toISOString(),

          note: `Local demo status changed to ${newStatus}.`,

        },

      ];

      return {

        ...item,

        status: newStatus,

        history,

        updatedAt: new Date().toISOString(),

      };

    });

    if (!saveStorage(STORAGE_KEYS.complaints, updated)) {

      notify("Unable to save status changes in browser storage.");

      return;

    }

    setComplaints(updated);

    if (trackedComplaint?.id === complaintId) {

      setTrackedComplaint(

        updated.find((item) => item.id === complaintId) || null

      );

    }

    notify("Local demo status updated. No government system was contacted.");

  }

  function deleteLocalComplaint(complaintId) {

    const confirmed = window.confirm(

      "Delete this complaint record from this browser? This cannot be undone here."

    );

    if (!confirmed) return;

    const updated = complaints.filter((item) => item.id !== complaintId);

    if (!saveStorage(STORAGE_KEYS.complaints, updated)) {

      notify("Unable to update browser storage.");

      return;

    }

    setComplaints(updated);

    if (trackedComplaint?.id === complaintId) {

      setTrackedComplaint(null);

    }

    notify("Local complaint record deleted.");

  }

 
async function handleAuthSubmit(event) {
  event.preventDefault();

  try {
    const isSignup = authMode === "signup";
    const endpoint = isSignup
      ? "/api/v1/auth/register"
      : "/api/v1/auth/login";

    const payload = isSignup
      ? {
          full_name: authForm.name.trim(),
          email: authForm.email.trim(),
          password: authForm.password,
        }
      : {
          email: authForm.email.trim(),
          password: authForm.password,
        };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Read as text first: some proxy/server errors return an empty or non-JSON body.
    const responseText = await response.text();
    let data = {};

    if (responseText.trim()) {
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Backend returned an invalid response (HTTP ${response.status}). Check the backend terminal.`
        );
      }
    }

    if (!response.ok) {
      const detail = data.detail;
      throw new Error(
        typeof detail === "string"
          ? detail
          : `Request failed (HTTP ${response.status}).`
      );
    }

    if (isSignup) {
      notify("Account created successfully. Please sign in.");
      setAuthMode("login");
      setShowPassword(false);
    } else {
      if (!data.access_token) {
        throw new Error("Login response did not contain an access token.");
      }

      localStorage.setItem("civiclens_access_token", data.access_token);
      notify("Login successful.");
      setAuthOpen(false);
    }
  } catch (error) {
    notify(
      error instanceof TypeError
        ? "Cannot connect to the backend. Check the frontend proxy and backend terminal."
        : error.message || "Authentication failed."
    );
  }
}

  function openDigiLocker() {

    notify(

      "DigiLocker integration pending. Official application approval, credentials, consent flow and secure backend are required."

    );

  }

  function toggleTheme() {

    const next = !darkMode;

    setDarkMode(next);

    saveStorage(STORAGE_KEYS.theme, next);

  }

  function submitAssistant(event) {

    event.preventDefault();

    const question = assistantQuestion.trim();

    if (!question) return;

    setAssistantMessages((previous) => [

      ...previous,

      {

        role: "user",

        text: question,

      },

      {

        role: "assistant",

        text:

          "The CivicLens AI assistant interface is ready for integration. It is not connected to an AI model yet, so I cannot generate a verified answer. For a civic complaint, use Report Issue to create a local demo record.",

      },

    ]);

    setAssistantQuestion("");

  }

  function renderComplaintCard(item, showActions = false) {

    return (

      <article className="complaint-item" key={item.id}>

        <div className="complaint-item-main">

          <div className="complaint-card-topline">

            <strong>{item.category}</strong>

            <span className={`status-pill ${getStatusClass(item.status)}`}>

              {item.status}

            </span>

          </div>

          <p>{item.district}, {item.state}</p>

          <small>Reference: {item.id}</small>

          <small>Submitted: {formatDate(item.createdAt)}</small>

          <p className="complaint-description">{item.description}</p>

        </div>

        <div className="complaint-item-right">

          <button

            className="text-button"

            onClick={() => {

              setTrackingId(item.id);

              setTrackedComplaint(item);

              navigate("track");

            }}

          >

            View tracking →

          </button>

          {showActions && (

            <button

              className="text-button"

              onClick={() => deleteLocalComplaint(item.id)}

            >

              Delete local record

            </button>

          )}

        </div>

      </article>

    );

  }

  function renderHeader() {

    return (

      <>

        <div className="government-strip">

          <div className="container gov-inner">

            <span>भारत सरकार &nbsp;|&nbsp; Government of India</span>

            <span>Independent Civic Platform Concept</span>

          </div>

        </div>

        <header className="site-header">

          <div className="container header-main">

            <button

              className="brand"

              type="button"

              onClick={() => navigate("home")}

              aria-label="CivicLens India home"

            >

              <img

                className="brand-logo"

                src="/civiclens-logo.png.png"

                alt="CivicLens India — Your Voice. Your City."

              />

            </button>

            <div className="header-tools">

              <form

                className="search-form"

                onSubmit={(event) => {

                  event.preventDefault();

                  navigate("services");

                }}

              >

                <label className="sr-only" htmlFor="global-search">

                  Search civic services

                </label>

                <input

                  id="global-search"

                  value={search}

                  onChange={(event) => setSearch(event.target.value)}

                  placeholder="Search services, issues or information..."

                />

                <button type="submit" aria-label="Search">⌕</button>

              </form>

              <label className="language-control">

                <span aria-hidden="true">◎</span>

                <span className="sr-only">Choose language</span>

                <select

                  value={language}

                  onChange={(event) => {

                    const nextLanguage = event.target.value;

                    setLanguage(nextLanguage);

                    saveStorage(STORAGE_KEYS.preferences, {

                      language: nextLanguage,

                      selectedState,

                    });

                  }}

                >

                  <option value="English">English</option>

                  {LANGUAGES.filter((item) => item !== "English").map((item) => (

                    <option key={item} value={item}>{item}</option>

                  ))}

                </select>

              </label>

              <button

                className="theme-toggle"

                type="button"

                onClick={toggleTheme}

                aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}

                title="Toggle appearance"

              >

                {darkMode ? "☀" : "☾"}

              </button>

            </div>

          </div>

          <div className="nav-band">

            <div className="container nav-inner">

              <button

                className="menu-toggle"

                type="button"

                onClick={() => setMobileMenuOpen((value) => !value)}

                aria-expanded={mobileMenuOpen}

                aria-label="Toggle navigation"

              >

                ☰

              </button>

              <nav className={`nav-links ${mobileMenuOpen ? "nav-open" : ""}`}>

                {NAV_ITEMS.map((item) => (

                  <button

                    type="button"

                    key={item.id}

                    className={activePage === item.id ? "active" : ""}

                    onClick={() => navigate(item.id)}

                  >

                    <span aria-hidden="true">{item.icon}</span>

                    {item.label}

                  </button>

                ))}

                <button

                  type="button"

                  className="nav-login"

                  onClick={() => setAuthOpen(true)}

                >

                  Sign in →

                </button>

              </nav>

            </div>

          </div>

        </header>

      </>

    );

  }

  function renderHome() {

    return (

      <>

        <section className="hero" id="home">

          <div className="hero-photo" aria-hidden="true" />

          <div className="hero-overlay" />

          <div className="container hero-content">

            <div className="hero-copy">

              <div className="eyebrow">

                <span className="tricolor-line" />

                A CITIZEN-FIRST PLATFORM FOR INDIA

              </div>

              <h1>

                Cleaner Cities

                <span className="blue-line">Stronger Communities</span>

                <span>with <span className="orange-line">Your Voice</span></span>

              </h1>

              <p>

                Report civic issues, follow their progress and help build

                cleaner, safer and smarter communities.

              </p>

              <div className="hero-actions">

                <button

                  className="button button-primary"

                  onClick={() => navigate("report")}

                >

                  ⚑ Report a Civic Issue →

                </button>

                <button

                  className="button button-outline"

                  onClick={() => navigate("track")}

                >

                  ⌕ Track a Complaint →

                </button>

              </div>

              <p className="hero-disclaimer">

                Independent civic platform concept. Not an official

                Government of India website.

              </p>

            </div>

            <aside >

              <div className="hero-info-heading">

                <span></span>

                <span>

                  <strong></strong>

                  <small></small>

                </span>

              </div>

              <div><span></span> </div>

              <div><span></span> </div>

              <div><span></span> </div>

              <div><span></span> </div>

            </aside>

          </div>

        </section>

        <section id="services">

          <div className="container">

            <div className="section-heading">

              <div>

                <div className="eyebrow">CIVIC SERVICES</div>

                <h2>What needs attention in your area?</h2>

                <p>Choose a category to report a local civic issue.</p>

              </div>

              <button

                className="button button-outline"

                onClick={() => navigate("services")}

              >

                View all services →

              </button>

            </div>

            <div className="services-grid">

              {filteredServices.slice(0, 6).map((service) => (

                <button

                  type="button"

                  className="service-card"

                  key={service.id}

                  onClick={() => chooseService(service.title)}

                >

                  <span className={`service-icon service-icon-${service.color}`}>

                    {service.icon}

                  </span>

                  <span className="service-card-copy">

                    <strong>{service.title}</strong>

                    <small>{service.description}</small>

                  </span>

                  <span className="service-arrow">→</span>

                </button>

              ))}

            </div>

            {filteredServices.length === 0 && (

              <div className="empty-state">

                No matching services found. Try searching for roads, water or waste.

              </div>

            )}

          </div>

        </section>

        <section className="report-band">

          <div className="container report-band-grid">

            <div className="india-map-card" aria-hidden="true">

              <div className="map-symbol">INDIA</div>

              <span className="map-pin pin-one">●</span>

              <span className="map-pin pin-two">●</span>

              <span className="map-pin pin-three">●</span>

            </div>

            <div className="report-panel">

              <div className="eyebrow">CITIZEN PARTICIPATION</div>

              <h2>Report issues from anywhere in India</h2>

              <p>

                Choose your State/UT and district to get started.

              </p>

              <div className="quick-location-form">

                <label>

                  State / Union Territory

                  <select

                    value={selectedState}

                    onChange={(event) => {
                      const nextState = event.target.value;
                      setSelectedState(nextState);
                      const stateInfo = STATES.find((item) => item.name === nextState);
                      if (stateInfo) {
                        saveStorage(STORAGE_KEYS.preferences, {
                          ...readStorage(STORAGE_KEYS.preferences, {}),
                          language,
                          selectedState: nextState,
                        });
                      }
                    }}

                  >

                    <option value="">Select State / UT</option>

                    {STATES.map((state) => (

                      <option key={state.name} value={state.name}>

                        {state.name}

                      </option>

                    ))}

                  </select>

                </label>

                <button

                  className="button button-primary"

                  onClick={() => {

                    setReportForm((previous) => ({

                      ...previous,

                      state: selectedState,

                    }));

                    navigate("report");

                  }}

                >

                  Report Now →

                </button>

              </div>

            </div>

            <aside className="tracking-promo">

              <div className="tracking-illustration" aria-hidden="true">⌖</div>

              <h3>Complaint Tracking</h3>

              <p>Look up the status of a complaint record.</p>

              <button

                className="button button-outline"

                onClick={() => navigate("track")}

              >

                Track Complaint →

              </button>

            </aside>

          </div>

        </section>

        <section className="section">

          <div className="container">

            <div className="section-heading">

              <div>

                <div className="eyebrow">TRANSPARENCY BY DESIGN</div>

                <h2>From reporting to resolution</h2>

                <p>A clear workflow for documenting and following civic issues.</p>

              </div>

            </div>

            <div className="workflow-grid">

              {[

                ["01", "Report", "Describe the issue and provide its location."],

                ["02", "Review", "A future verified workflow can check and classify reports."],

                ["03", "Track", "Follow status changes and the complaint timeline."],

                ["04", "Analyse", "Use aggregated records to understand recurring issues."],

              ].map(([number, title, description]) => (

                <article className="workflow-card" key={number}>

                  <span className="workflow-number">{number}</span>

                  <h3>{title}</h3>

                  <p>{description}</p>

                </article>

              ))}

            </div>

          </div>

        </section>

      </>

    );

  }

  function renderServices() {

    return (

      <PageShell

        eyebrow="CIVIC SERVICES"

        title="Services and issue categories"

        description="Select a service to open the complaint reporting form."

      >

        <div className="services-grid all-services-grid">

          {filteredServices.map((service) => (

            <button

              className="service-card"

              type="button"

              key={service.id}

              onClick={() => chooseService(service.title)}

            >

              <span className={`service-icon service-icon-${service.color}`}>

                {service.icon}

              </span>

              <span className="service-card-copy">

                <strong>{service.title}</strong>

                <small>{service.description}</small>

              </span>

              <span className="service-arrow">→</span>

            </button>

          ))}

        </div>

        {filteredServices.length === 0 && (

          <div className="empty-state">No matching services found.</div>

        )}

      </PageShell>

    );

  }

  function renderReport() {

    return (

      <PageShell

        eyebrow="CITIZEN COMPLAINT PORTAL"

        title="Report a civic issue"

        description="Provide accurate details to create a local demonstration record."

      >

        <div className="notice-banner">

          <strong>Prototype notice</strong>

          <p>

            This form saves to this browser only. It does not send reports to

            a municipality, state government or government department.

          </p>

        </div>

        <form className="report-form main-report-form" onSubmit={submitComplaint}>

          <div className="form-grid">

            <label>

              Full name *

              <input

                name="name"

                autoComplete="name"

                value={reportForm.name}

                onChange={updateReport}

                minLength={2}

                required

              />

            </label>

            <label>

              Email address *

              <input

                name="email"

                type="email"

                autoComplete="email"

                value={reportForm.email}

                onChange={updateReport}

                required

              />

            </label>

            <label>

              Phone number (optional)

              <input

                name="phone"

                type="tel"

                autoComplete="tel"

                value={reportForm.phone}

                onChange={updateReport}

                maxLength={20}

              />

            </label>

            <label>

              State / Union Territory *

              <select

                name="state"

                value={reportForm.state}

                onChange={updateReport}

                required

              >

                <option value="">Select State / UT</option>

                {STATES.map((state) => (

                  <option key={state.name} value={state.name}>

                    {state.name}

                  </option>

                ))}

              </select>

            </label>

            <label>

              District / City *

              <input

                name="district"

                value={reportForm.district}

                onChange={updateReport}

                placeholder="Enter district or city"

                required

              />

            </label>

            <label>

              Preferred state language

              <input

                value={

                  STATES.find((state) => state.name === reportForm.state)?.language || ""

                }

                readOnly

                placeholder="Select a state first"

              />

            </label>

            <label className="full-width">

              Issue category *

              <select

                name="category"

                value={reportForm.category}

                onChange={updateReport}

                required

              >

                <option value="">Select category</option>

                {SERVICES.map((service) => (

                  <option key={service.id} value={service.title}>

                    {service.title}

                  </option>

                ))}

              </select>

            </label>

            <label className="full-width">

              Street / location *

              <input

                name="address"

                value={reportForm.address}

                onChange={updateReport}

                placeholder="Area, road or nearby landmark"

                required

              />

            </label>

            <div className="location-control full-width">

              <div>

                <strong>Geographic location</strong>

                <p>

                  Location sharing is optional. Your browser will ask permission.

                </p>

                {reportForm.latitude && reportForm.longitude && (

                  <small>

                    Coordinates: {reportForm.latitude}, {reportForm.longitude}

                  </small>

                )}

              </div>

              <button

                type="button"

                className="button button-outline"

                onClick={getCurrentLocation}

              >

                ⌖ Use my location

              </button>

            </div>

            <label className="full-width">

              Describe the issue *

              <textarea

                name="description"

                value={reportForm.description}

                onChange={updateReport}

                minLength={20}

                maxLength={2000}

                rows={5}

                placeholder="Describe what happened, where it happened and why attention is needed."

                required

              />

              <small>{reportForm.description.length}/2000 characters</small>

            </label>

            <label className="full-width">

              Upload supporting photo (optional, maximum 1 MB)

              <input

                type="file"

                accept="image/*"

                onChange={handlePhoto}

              />

            </label>

          </div>

          {reportForm.photo && (

            <div className="photo-preview">

              <img src={reportForm.photo} alt="Selected issue evidence" />

              <button

                type="button"

                className="text-button"

                onClick={() =>

                  setReportForm((previous) => ({ ...previous, photo: "" }))

                }

              >

                Remove photo

              </button>

            </div>

          )}

          <div className="form-actions">

            <button className="button button-primary" type="submit">

              Create Local Demo Record →

            </button>

            <button

              className="button button-outline"

              type="button"

              onClick={() => navigate("home")}

            >

              Cancel

            </button>

          </div>

        </form>

      </PageShell>

    );

  }

  function renderTrack() {

    return (

      <PageShell

        eyebrow="COMPLAINT STATUS"

        title="Track a complaint"

        description="Enter the reference ID generated when a record was saved in this browser."

      >

        <form className="tracking-card tracking-page-card" onSubmit={trackComplaint}>

          <span className="tracking-card-icon">⌕</span>

          <h3>Find your complaint</h3>

          <label htmlFor="tracking-reference">Complaint reference number</label>

          <input

            id="tracking-reference"

            value={trackingId}

            onChange={(event) => setTrackingId(event.target.value)}

            placeholder="e.g. CL-..."

            required

          />

          <button className="button button-primary full-width" type="submit">

            Check Status →

          </button>

          {trackedComplaint && (

            <div className="complaint-result">

              <strong>{trackedComplaint.id}</strong>

              <span>{trackedComplaint.category}</span>

              <span>{trackedComplaint.district}, {trackedComplaint.state}</span>

              <span className={`status-pill ${getStatusClass(trackedComplaint.status)}`}>

                {trackedComplaint.status}

              </span>

              <small>Created: {formatDate(trackedComplaint.createdAt)}</small>

              <small>Last updated: {formatDate(trackedComplaint.updatedAt || trackedComplaint.createdAt)}</small>

            </div>

          )}

        </form>

        {trackedComplaint && (

          <section className="timeline-section">

            <h3>Complaint timeline</h3>

            {(trackedComplaint.history || []).slice().reverse().map((event, index) => (

              <article className="timeline-event" key={`${event.date}-${index}`}>

                <span className="timeline-dot" />

                <div>

                  <strong>{event.status}</strong>

                  <small>{formatDate(event.date)}</small>

                  <p>{event.note}</p>

                </div>

              </article>

            ))}

          </section>

        )}

      </PageShell>

    );

  }

  function renderDashboard() {

    return (

      <PageShell

        eyebrow="CITIZEN DASHBOARD"

        title="My complaints"

        description="View and manage the complaint records saved in this browser."

      >

        <div className="stats-grid">

          <StatCard label="Total records" value={complaintStats.total} icon="▣" />

          <StatCard label="Submitted" value={complaintStats.submitted} icon="◷" />

          <StatCard label="In progress" value={complaintStats.inProgress} icon="↻" />

          <StatCard label="Resolved" value={complaintStats.resolved} icon="✓" />

        </div>

        <div className="section-heading dashboard-heading">

          <div>

            <h2>Complaint history</h2>

            <p>These records are not synchronized with any server.</p>

          </div>

          <button

            className="button button-primary"

            onClick={() => navigate("report")}

          >

            + Report an issue

          </button>

        </div>

        {complaints.length === 0 ? (

          <EmptyState

            title="No complaints yet"

            description="Create your first local demo record using the complaint form."

            action={() => navigate("report")}

            actionLabel="Report an issue"

          />

        ) : (

          <div className="complaint-list">

            {complaints.map((item) => renderComplaintCard(item, true))}

          </div>

        )}

      </PageShell>

    );

  }

  function renderOfficerPortal() {

    return (

      <PageShell

        eyebrow="OFFICER PORTAL PREVIEW"

        title="Complaint operations"

        description="Demonstration interface for reviewing locally saved records."

      >

        <div className="notice-banner">

          <strong>Not a secure officer portal</strong>

          <p>

            Role-based access control and officer authentication are not

            connected. Changes on this screen affect local demo records only.

          </p>

        </div>

        <div className="stats-grid">

          <StatCard label="Total records" value={complaintStats.total} icon="▣" />

          <StatCard label="Submitted" value={complaintStats.submitted} icon="◷" />

          <StatCard label="Assigned" value={complaintStats.assigned} icon="♙" />

          <StatCard label="Resolved" value={complaintStats.resolved} icon="✓" />

        </div>

        <div className="officer-filters">

          <label>

            Search records

            <input

              value={officerSearch}

              onChange={(event) => setOfficerSearch(event.target.value)}

              placeholder="Reference, category, location..."

            />

          </label>

          <label>

            Filter status

            <select

              value={officerStatus}

              onChange={(event) => setOfficerStatus(event.target.value)}

            >

              {["All", "Submitted", "Assigned", "In Progress", "Resolved"].map((status) => (

                <option key={status} value={status}>{status}</option>

              ))}

            </select>

          </label>

        </div>

        {filteredOfficerComplaints.length === 0 ? (

          <EmptyState

            title="No matching records"

            description="Create a demo complaint or adjust your filters."

            action={() => navigate("report")}

            actionLabel="Create demo complaint"

          />

        ) : (

          <div className="complaint-list">

            {filteredOfficerComplaints.map((item) => (

              <article className="complaint-item officer-complaint" key={item.id}>

                <div className="complaint-item-main">

                  <div className="complaint-card-topline">

                    <strong>{item.category}</strong>

                    <span className={`status-pill ${getStatusClass(item.status)}`}>

                      {item.status}

                    </span>

                  </div>

                  <p>{item.district}, {item.state}</p>

                  <small>{item.id} · {formatDate(item.createdAt)}</small>

                  <p className="complaint-description">{item.description}</p>

                </div>

                <label className="status-editor">

                  Demo status

                  <select

                    value={item.status}

                    onChange={(event) =>

                      updateLocalStatus(item.id, event.target.value)

                    }

                  >

                    {["Submitted", "Assigned", "In Progress", "Resolved"].map((status) => (

                      <option key={status} value={status}>{status}</option>

                    ))}

                  </select>

                </label>

              </article>

            ))}

          </div>

        )}

      </PageShell>

    );

  }

  function renderAssistant() {

    return (

      <PageShell

        eyebrow="CIVIC ASSISTANT"

        title="How can we help?"

        description="Explore the assistant interface. AI-generated answers are not enabled in this frontend stage."

      >

        <div className="assistant-layout">

          <aside className="assistant-sidebar">

            <span className="assistant-icon">✳</span>

            <h3>CivicLens Assistant</h3>

            <p>Designed for civic issue guidance and platform navigation.</p>

            <div className="notice-banner">

              <strong>AI connection pending</strong>

              <p>This interface does not yet call an AI model or external service.</p>

            </div>

          </aside>

          <section className="assistant-chat">

            <div className="assistant-messages" aria-live="polite">

              {assistantMessages.length === 0 && (

                <div className="assistant-welcome">

                  <h3>Ask a civic question</h3>

                  <p>

                    Try asking how to report a pothole, track a local record,

                    or navigate the CivicLens demo.

                  </p>

                </div>

              )}

              {assistantMessages.map((message, index) => (

                <article

                  className={`chat-message ${message.role}`}

                  key={`${message.role}-${index}`}

                >

                  <strong>{message.role === "user" ? "You" : "CivicLens Assistant"}</strong>

                  <p>{message.text}</p>

                </article>

              ))}

            </div>

            <form className="assistant-input-row" onSubmit={submitAssistant}>

              <label className="sr-only" htmlFor="assistant-question">

                Enter your question

              </label>

              <input

                id="assistant-question"

                value={assistantQuestion}

                onChange={(event) => setAssistantQuestion(event.target.value)}

                placeholder="Type your civic question..."

                maxLength={1000}

                required

              />

              <button className="button button-primary" type="submit">Send →</button>

            </form>

          </section>

        </div>

      </PageShell>

    );

  }

  function renderAbout() {

    return (

      <PageShell

        eyebrow="ABOUT CIVICLENS INDIA"

        title="A citizen-first civic platform concept"

        description="A B.Tech CSE project concept for organizing civic reports, tracking progress and exploring responsible AI assistance."

      >

        <div className="about-grid">

          <article className="about-card">

            <span className="about-card-icon">◎</span>

            <h3>Citizen participation</h3>

            <p>Structured reporting with category, location and supporting evidence.</p>

          </article>

          <article className="about-card">

            <span className="about-card-icon">↻</span>

            <h3>Transparent tracking</h3>

            <p>A planned status timeline from submission through resolution.</p>

          </article>

          <article className="about-card">

            <span className="about-card-icon">✳</span>

            <h3>Responsible AI</h3>

            <p>Future AI features will need actual models, evaluation and clear limitations.</p>

          </article>

        </div>

        <div className="notice-banner">

          <strong>Project status</strong>

          <p>

            CivicLens India is an independent project concept. It is not

            affiliated with or endorsed by the Government of India. The current

            frontend demo does not send complaints to public authorities.

          </p>

        </div>

      </PageShell>

    );

  }

  function renderSettings() {

    return (

      <PageShell

        eyebrow="PREFERENCES"

        title="Settings"

        description="Manage appearance and inspect the current frontend language selection."

      >

        <div className="settings-list">

          <div className="setting-row">

            <div>

              <strong>Dark appearance</strong>

              <p>Change the appearance of this prototype.</p>

            </div>

            <button className="button button-outline" onClick={toggleTheme}>

              {darkMode ? "Switch to light" : "Switch to dark"}

            </button>

          </div>

          <div className="setting-row">

            <div>

              <strong>Interface language</strong>

              <p>Current selection: {language}.</p>

            </div>

            <select

              value={language}

              onChange={(event) => {

                const nextLanguage = event.target.value;

                setLanguage(nextLanguage);

                saveStorage(STORAGE_KEYS.preferences, {

                  language: nextLanguage,

                  selectedState,

                });

              }}

            >

              {LANGUAGES.map((item) => (

                <option key={item} value={item}>{item}</option>

              ))}

            </select>

          </div>

          <div className="setting-row">

            <div>

              <strong>Local demo records</strong>

              <p>

                {complaints.length} record(s) currently stored in this browser.

              </p>

            </div>

            <button

              className="button button-outline"

              onClick={() => {

                setComplaints(readStorage(STORAGE_KEYS.complaints, []));

                notify("Local records reloaded.");

              }}

            >

              Refresh records

            </button>

          </div>

          <div className="setting-row">

            <div>

              <strong>DigiLocker authorization</strong>

              <p>Secure official integration is not configured.</p>

            </div>

            <button className="button button-outline" onClick={openDigiLocker}>

              Integration status

            </button>

          </div>

        </div>

      </PageShell>

    );

  }

  function renderFooter() {

    return (

      <footer className="site-footer">

        <div className="container footer-main">

          <button

            type="button"

            className="brand footer-brand"

            onClick={() => navigate("home")}

          >

            <span className="brand-emblem">✳</span>

            <span className="brand-copy">

              <strong>CivicLens <span>India</span></strong>

              <small>YOUR VOICE. YOUR CITY.</small>

            </span>

          </button>

          <p>

            An independent civic engagement project concept focused on

            accessible reporting and transparent workflows.

          </p>

          <div className="footer-links">

            <button onClick={() => navigate("services")}>Services</button>

            <button onClick={() => navigate("report")}>Report an issue</button>

            <button onClick={() => navigate("track")}>Track complaint</button>

            <button onClick={() => navigate("about")}>About</button>

            <button onClick={() => navigate("settings")}>Settings</button>

          </div>

        </div>

        <div className="container footer-bottom">

          <span>© {new Date().getFullYear()} CivicLens India</span>

          <span>Independent project concept · Not an official government website</span>

        </div>

      </footer>

    );

  }

  return (

    <div className={`app-shell ${darkMode ? "dark-theme" : ""}`}>

      {renderHeader()}

      <main id="main-content">

        {activePage === "home" && renderHome()}

        {activePage === "services" && renderServices()}

        {activePage === "report" && renderReport()}

        {activePage === "track" && renderTrack()}

        {activePage === "dashboard" && renderDashboard()}

        {activePage === "officer" && renderOfficerPortal()}

        {activePage === "assistant" && renderAssistant()}

        {activePage === "about" && renderAbout()}

        {activePage === "settings" && renderSettings()}

      </main>

      {renderFooter()}

      {notice && (

        <div className="toast" role="status" aria-live="polite">

          <span>{notice}</span>

          <button

            type="button"

            onClick={() => setNotice("")}

            aria-label="Dismiss notification"

          >

            ×

          </button>

        </div>

      )}

      {authOpen && (

        <div

          className="modal-backdrop"

          onMouseDown={(event) => {

            if (event.target === event.currentTarget) setAuthOpen(false);

          }}

        >

          <section

            className="auth-modal"

            role="dialog"

            aria-modal="true"

            aria-labelledby="auth-title"

          >

            <button

              type="button"

              className="modal-close"

              onClick={() => setAuthOpen(false)}

              aria-label="Close dialog"

            >

              ×

            </button>

            <div className="eyebrow">CIVICLENS INDIA ACCOUNT</div>

            <h2 id="auth-title">

              {authMode === "signup" ? "Create your account" : "Welcome back"}

            </h2>

            <p>

              Create an account or sign in to access CivicLens India.

            </p>

            <div className="auth-tabs" role="tablist" aria-label="Account access">

              <button
  type="button"
  className={authMode === "signup" ? "selected" : ""}
  onClick={() => {
    console.log("Sign up clicked");
    setAuthMode("signup");
  }}
>
  Sign up
</button>

<button
  type="button"
  className={authMode === "login" ? "selected" : ""}
  onClick={() => {
    console.log("Sign in clicked");
    setAuthMode("login");
  }}
>
  Sign in
</button>



            </div>

            <form className="auth-form" onSubmit={handleAuthSubmit}>

              {authMode === "signup" && (

                <label>

                  Full name

                  <input

                    value={authForm.name}

                    onChange={(event) =>

                      setAuthForm((previous) => ({

                        ...previous,

                        name: event.target.value,

                      }))

                    }

                    minLength={2}

                    autoComplete="name"

                    required

                  />

                </label>

              )}

              <label>

                Email address

                <input

                  type="email"

                  value={authForm.email}

                  onChange={(event) =>

                    setAuthForm((previous) => ({

                      ...previous,

                      email: event.target.value,

                    }))

                  }

                  autoComplete="email"

                  required

                />

              </label>

              <label>

                Password

                <span className="password-input-wrap">

                  <input

                    type={showPassword ? "text" : "password"}

                    value={authForm.password}

                    onChange={(event) =>

                      setAuthForm((previous) => ({

                        ...previous,

                        password: event.target.value,

                      }))

                    }

                    minLength={8}

                    autoComplete={authMode === "signup" ? "new-password" : "current-password"}

                    required

                  />

                  <button

                    type="button"

                    className="password-toggle"

                    onClick={() => setShowPassword((previous) => !previous)}

                  >

                    {showPassword ? "Hide" : "Show"}

                  </button>

                </span>

              </label>

              <button className="button button-primary full-width" type="submit">

                {authMode === "signup" ? "Continue to verification" : "Sign in"}

              </button>

              <button

                type="button"

                className="text-button"

                onClick={() =>

                  notify("Password reset requires a configured authentication backend.")

                }

              >

                Forgot password?

              </button>

            </form>

            <div className="modal-separator">OR</div>

            <button

              type="button"

              className="button button-outline full-width"

              onClick={openDigiLocker}

            >

              <span className="digilocker-mark">D</span>

              Continue with DigiLocker

            </button>

            <p className="form-note">

              Never provide your DigiLocker password or OTP to this prototype.

            </p>

          </section>

        </div>

      )}

    </div>

  );

}

function PageShell({ eyebrow, title, description, children }) {

  return (

    <section className="page-shell">

      <div className="container">

        <header className="page-heading">

          <div className="eyebrow">{eyebrow}</div>

          <h1>{title}</h1>

          <p>{description}</p>

        </header>

        {children}

      </div>

    </section>

  );

}

function StatCard({ label, value, icon }) {

  return (

    <article className="stat-card">

      <span className="stat-card-icon">{icon}</span>

      <div>

        <small>{label}</small>

        <strong>{value}</strong>

      </div>

    </article>

  );

}

function EmptyState({ title, description, action, actionLabel }) {

  return (

    <div className="empty-state empty-state-large">

      <span className="empty-state-icon">▣</span>

      <h3>{title}</h3>

      <p>{description}</p>

      {action && (

        <button className="button button-primary" onClick={action}>

          {actionLabel}

        </button>

      )}

    </div>

  );

}

export default App;