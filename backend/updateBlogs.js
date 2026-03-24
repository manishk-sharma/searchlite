import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Blog from './models/Blog.js';

dotenv.config();

const fullContentData = {
  "The Importance of Personal Care for a Healthy Lifestyle": `<p>In today's fast-paced, hyper-connected world, the concept of personal care often takes a back seat to professional responsibilities and familial obligations. However, failing to prioritize self-care is not just a fast track to burnout; it fundamentally undermines our ability to perform at our best in all areas of life.</p>
      
      <h3>The Mind-Body Connection</h3>
      <p>Personal care extends far beyond a skincare routine or a weekend spa trip. It encompasses the daily habits that sustain our physical and mental health. When we neglect our physical well-being—whether through poor diet, lack of sleep, or skipping exercise—our cognitive functions are directly impaired. We lose focus faster, struggle with complex problem-solving, and our emotional regulation falters.</p>
      
      <h3>Setting Boundaries</h3>
      <p>A crucial component of a healthy lifestyle is learning to set boundaries. This means knowing when to power down the laptop, when to say no to extra commitments, and when to dedicate time solely to your own recovery. Boundaries protect our energy, allowing us to engage more fully and authentically when we are 'on.'</p>
      
      <h3>Building a Sustainable Routine</h3>
      <p>The goal is not to adopt a rigid, impossible-to-maintain wellness regimen, but rather to find small, sustainable practices that ground you daily. This might be a ten-minute morning meditation, a daily walk without your phone, or simply ensuring you drink enough water. These micro-habits compound over time, building a foundation of resilience against the inevitable stressors of modern life.</p>

      <p>Ultimately, treating personal care as a necessity rather than an indulgence is the most proactive step we can take toward a healthy, balanced lifestyle.</p>`,
  "Why Personal Care is Essential for Daily Living": `<p>It is incredibly easy to get swept up in the tide of daily tasks, moving from one emergency to the next without pausing to check in with oneself. This reactionary mode of living is common, but it is ultimately unsustainable. Daily personal care routines are the anchor that keeps us grounded amidst the chaos.</p>
      
      <h3>The Productivity Paradox</h3>
      <p>There is a persistent myth that taking time out for personal care reduces the amount of time available for productive work. In reality, the opposite is true. Rest and rejuvenation are prerequisites for high-level cognitive work. A well-rested mind operates with greater efficiency and creativity. By dedicating time to personal care, we are actively investing in our future productivity.</p>
      
      <h3>Stress Reduction Through Predictability</h3>
      <p>One of the hidden benefits of a daily personal care routine is predictability. In a world fraught with uncertainty, establishing control over the first and last hours of our day provides a powerful psychological safety net. This structure reduces baseline anxiety and equips us to handle unexpected challenges with greater equanimity.</p>
      
      <p>Incorporating simple rituals—such as mindful morning coffee, stretching, or reading before bed—transforms personal care from an occasional luxury into an essential, non-negotiable part of daily living.</p>`,
  "The Role of Personal Care in Enhancing Well-Being": `<p>Well-being is a holistic concept that goes beyond simply the absence of illness. It involves thriving physically, mentally, and emotionally. Maintaining a consistent personal care regimen is arguably the most effective tool we possess to enhance all pillars of well-being simultaneously.</p>
      
      <h3>Physiological Benefits</h3>
      <p>From a biological standpoint, self-care practices directly influence our physical state. Quality sleep, regular movement, and proper nutrition profoundly impact our immune system, hormone regulation, and cellular repair processes. Prioritizing these activities drastically reduces the risk of chronic diseases and improves longevity.</p>
      
      <h3>Psychological Resilience</h3>
      <p>Mentally, personal care fosters resilience. Taking the time to engage in activities we enjoy, stepping away from constant stimulation, and practicing self-compassion actively rewires the brain to better handle stress. It prevents the accumulation of emotional fatigue, maintaining a healthy baseline of positivity and motivation.</p>
      
      <p>The journey toward enhanced well-being is ongoing, but the path is paved with the small, daily choices we make to care for ourselves physically and mentally.</p>`,
  "Balancing Work and Personal Care: Strategies for Success": `<p>Striking the perfect balance between professional ambition and personal well-being is the defining challenge of the modern workforce. True success is rarely achieved in a vacuum of exhaustion; it is built on a foundation of sustainable practices.</p>
      
      <h3>The Myth of the Grind</h3>
      <p>We often celebrate overwork as a badge of honor, but chronic stress actively degrades the prefrontal cortex—the very part of the brain required for executive function, creativity, and strategic planning. A strategic approach to personal care is the ultimate competitive advantage.</p>
      
      <h3>Practical Integration</h3>
      <p>The secret lies in seamless integration rather than strict compartmentalization. This means blocking off "focus time" in your calendar, establishing rigid boundaries around after-hours communication, and learning to delegate effectively. Prioritize tasks based on true urgency rather than manufactured panic.</p>

      <p>Success means nothing if you lack the health and vitality to enjoy it. Let personal care be the engine that drives your career, not the casualty of it.</p>`,
  "The Science of Sleep and Personal Care": `<p>Of all the tenets of personal care, sleep is universally the most critical and universally the most neglected. Without adequate restorative sleep, all other wellness interventions—diet, exercise, mindfulness—are significantly compromised.</p>
      
      <h3>The Architecture of Sleep</h3>
      <p>Sleep is not merely a passive state of rest; it is a highly active neurological process. During the deep stages of sleep, the brain actively flushes out neurotoxins accumulated during waking hours. During REM sleep, emotional processing and memory consolidation occur. Skimping on these cycles severely impacts cognitive longevity.</p>
      
      <h3>Sleep Hygiene mastery</h3>
      <p>Optimizing this process requires treating sleep preparation as a formal routine. This means maintaining a cool, completely dark room, eliminating blue light exposure an hour prior to bed, and ensuring a consistent wake time, even on weekends.</p>

      <p>Treat sleep not as an obstacle to productivity, but as the foundational pillar of personal care upon which all true health rests.</p>`
};

const updateDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        for (const [title, content] of Object.entries(fullContentData)) {
            const result = await Blog.findOneAndUpdate(
                { title: title },
                { $set: { content: content } },
                { new: true }
            );
            if (result) {
                console.log(`Updated content for: ${title}`);
            } else {
                console.log(`Could not find blog to update: ${title}`);
            }
        }

        console.log('Finished updating full blog contents!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

updateDB();
