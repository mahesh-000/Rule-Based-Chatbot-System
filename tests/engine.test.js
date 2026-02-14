import { ChatEngine } from '../src/engine.js';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./data/rules.json', 'utf8'));
const engine = new ChatEngine(data);

function test(name, input, expectedSubstrings) {
    const response = engine.getResponse(input);
    const passed = expectedSubstrings.some(sub => response.toLowerCase().includes(sub.toLowerCase()));

    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${name}`);
    if (!passed) {
        console.log(`   Input: ${input}`);
        console.log(`   Expected one of: ${JSON.stringify(expectedSubstrings)}`);
        console.log(`   Actual: ${response}`);
    }
}

console.log("Starting Enhanced Engine Tests...\n");

// Test Identity
test("Identity match", "who are you?", ["Rule-Based Chatbot", "CoreChat"]);

// Test Motivation (Scoring/Keywords)
test("Motivation match", "I am so tired and stressed", ["beginner", "stronger", "quit", "progress", "survived", "I hear you"]);

// Test Gratitude
test("Gratitude match", "thank you so much", ["welcome", "assist", "happy to help"]);

// Test Scoring (Priority)
// Input matches both 'mood_sad' (upset) and 'motivation' (fail)
// 'fail' in motivation and 'upset' in mood_sad. Both get 1 point.
// If input is "I failed my test and I am upset", it might match either.
test("Priority/Mood match", "I feel sad and tired", ["I hear you", "sorry", "capable", "listen"]);

// Test Fallback
test("Fallback check", "random gibberish 123", ["didn't quite understand", "rephrase"]);

// Test Time Logic (Note: Results depend on system time)
console.log("\nNote: Time-based tests depend on current system time.");
const morningResponse = engine.getResponse("good morning");
console.log(`Morning test response: ${morningResponse}`);

console.log("\nTests Complete.");
