const TITLE_MAP = {
    'python-masterclass': 'Python Programming Masterclass',
    'fullstack-dev': 'Full Stack Web Development',
    'ai-foundations': 'Artificial Intelligence Foundations',
    'gen-ai': 'Generative AI & Large Language Models',
    'cyber-security': 'Cyber Security & Ethical Hacking',
    'data-analytics': 'Data Science & Analytics BootCamp',
    'cross-platform-mobile': 'Cross-Platform App Development',
    'advanced-mobile': 'Advanced iOS & Android Architecture',
    'reinforcement-learning': 'Deep Reinforcement Learning',
    nlp: 'Natural Language Processing',
    mlops: 'Predictive Analytics & ML Ops',
    devops: 'Cloud Native DevOps Engine',
};

const DESC_MAP = {
    'python-masterclass': 'Learn basics to building automation workflows and real-world scripting from scratch.',
    'fullstack-dev': 'Master modern front-end layout styling, scalable backend architectures, and production databases.',
    'ai-foundations': 'Deep dive into multi-layered Neural Networks, pattern modeling, and linear automation engines.',
    'gen-ai': 'Explore transformers architectures, structural fine-tuning parameters, prompt workflows, and context window logic.',
    'cyber-security': 'Understand digital architecture weaknesses, network defenses, and threat analysis frameworks.',
    'data-analytics': 'Transform raw enterprise variables into interactive visual matrices using Pandas and Tableau.',
    'cross-platform-mobile': 'Build industry-grade intuitive workflows natively deployment-ready for iOS and Android stores.',
    'advanced-mobile': 'Optimize device performance matrix using asynchronous operations, lifecycle models, and reactive structures.',
    'reinforcement-learning': 'Master decision-making agents using Q-learning, policy gradients, and algorithmic actors.',
    nlp: 'Construct parsing tokenizers, sequence generation loops, and transformer translation layers.',
    mlops: 'Implement automation orchestration frameworks, continuous calibration steps, and pipeline monitoring tracking.',
    devops: 'Deploy production networks using micro-container clusters, orchestration logs, and pipelines.',
};

const IMG_MAP = {
    'python-masterclass': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    'fullstack-dev': 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=80',
    'ai-foundations': 'https://lirp.cdn-website.com/de11e97c/dms3rep/multi/opt/AI+FOUNDATIONS-640w.png',
    'gen-ai': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ-HU7vvPiM9SBgEhJCRi48tQbm7P-bLf4Yr15IJkEuI0ugjDK8GiNi_E&s=10',
    'cyber-security': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    'data-analytics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    'cross-platform-mobile': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
    'advanced-mobile': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    'reinforcement-learning': 'https://bs-uploads.toptal.io/blackfish-uploads/components/open_graph_image/8958314/og_image/optimized/deep-dive-into-reinforcement-learning-2393e08aa800a4247f6066eee9ba0e8d.png',
    nlp: 'https://miro.medium.com/1*tjyq7DrWkcK_rgym6YJ1Pw.png',
    mlops: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    devops: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=600&q=80',
};

const DURATION_MAP = {
    'python-masterclass': '6 weeks',
    'fullstack-dev': '12 weeks',
    'ai-foundations': '8 weeks',
    'gen-ai': '4 weeks',
    'cyber-security': '10 weeks',
    'data-analytics': '8 weeks',
    'cross-platform-mobile': '8 weeks',
    'advanced-mobile': '10 weeks',
    'reinforcement-learning': '6 weeks',
    nlp: '6 weeks',
    mlops: '8 weeks',
    devops: '8 weeks',
};

const MENTOR_MAP = {
    'python-masterclass': 'Dr. Sarah Jenkins',
    'fullstack-dev': 'Alex Rivera',
    'ai-foundations': 'Prof. Alan Turing',
    'gen-ai': 'Dr. Emily Carter',
    'cyber-security': 'Michael Chang',
    'data-analytics': 'Jessica Bliss',
    'cross-platform-mobile': 'David Miller',
    'advanced-mobile': 'Sophia Kwok',
    'reinforcement-learning': 'Dr. Richard Sutton',
    nlp: 'Dr. Christopher Manning',
    mlops: 'James Anderson',
    devops: 'Elena Rostova',
};

const DEFAULT_IMG = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80';

function categoryFor(courseId) {
    if (['python-masterclass', 'fullstack-dev', 'devops'].includes(courseId)) return 'web';
    if (['ai-foundations', 'gen-ai', 'reinforcement-learning'].includes(courseId)) return 'ai';
    if (['nlp', 'mlops'].includes(courseId)) return 'ml';
    if (courseId === 'cyber-security') return 'security';
    if (courseId === 'data-analytics') return 'analytics';
    if (['cross-platform-mobile', 'advanced-mobile'].includes(courseId)) return 'mobile';
    return null;
}

document.addEventListener('DOMContentLoaded', () => {
    const courseId = new URLSearchParams(window.location.search).get('courseId') || 'all';

    document.getElementById('idBadge').innerText = courseId;

    const currentTitle = TITLE_MAP[courseId] || 'New Modular Track';
    const currentDesc = DESC_MAP[courseId] || '';
    const currentImg = IMG_MAP[courseId] || DEFAULT_IMG;
    const currentDuration = DURATION_MAP[courseId] || '';
    const currentMentor = MENTOR_MAP[courseId] || '';

    document.getElementById('pageTitle').innerText = 'Edit: ' + currentTitle;
    document.getElementById('courseTitleInput').value = currentTitle;
    document.getElementById('courseDescTextarea').value = currentDesc;
    document.getElementById('courseImgUrlInput').value = IMG_MAP[courseId] ? currentImg : '';
    document.getElementById('coverPreview').src = currentImg;
    document.getElementById('courseDurationInput').value = currentDuration;
    document.getElementById('courseMentorInput').value = currentMentor;

    const category = categoryFor(courseId);
    if (category) document.getElementById('courseCategorySelect').value = category;
});

document.getElementById('courseImgUrlInput').addEventListener('input', (e) => {
    const preview = document.getElementById('coverPreview');
    preview.src = e.target.value.trim() !== '' ? e.target.value : DEFAULT_IMG;
});

document.getElementById('editCourseForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Target matrix changes cached successfully! Redirecting back to inventory board.');
    window.location.href = 'courses.html';
});