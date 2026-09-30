/* =========================================================================
   Study material for every built-in course.

   Each course lists one lesson per module (same order as the module names in
   api.js). A lesson has:
     video   - a .mp4 URL, OR a YouTube link (watch / youtu.be / embed).
               The clips below are SAMPLE videos - replace any `video` value
               with your own recording and nothing else needs to change.
     reading - the text students scroll through to complete the module.
               Built with r(intro, [key points...]).
   ========================================================================= */

const V = {
    mdn:  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    blaze:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    escape:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    fun:  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    joy:  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    melt: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
};

function r(intro, points) {
    return '<p>' + intro + '</p><p class="fw-semibold mb-1">Key points</p><ul class="mb-2">' +
        points.map((p) => '<li>' + p + '</li>').join('') + '</ul>' +
        '<p class="mb-0"><em>You have reached the end of this reading - great work!</em></p>';
}

export const LESSONS = {
    'python-masterclass': {
        video: V.mdn,
        modules: [
            r('Python is a readable, general-purpose language used for automation, web backends, data analysis and AI. Programs are made of statements executed top to bottom, and Python uses indentation (not braces) to mark blocks of code. You store values in variables, whose type (int, float, str, bool) is decided by the value assigned.',
              ['Print output with <code>print()</code> and read input with <code>input()</code>.', 'Use <code>if / elif / else</code> for decisions and <code>for</code> / <code>while</code> for loops.', 'Indentation is part of the syntax - use 4 spaces consistently.', 'Comments start with <code>#</code> and are ignored by Python.']),
            r('Data structures let you group values. A list is an ordered, changeable collection; a tuple is ordered but fixed; a dictionary maps keys to values; a set stores unique items. Choosing the right structure keeps code short and fast.',
              ['Lists: <code>nums = [1, 2, 3]</code>, append with <code>nums.append(4)</code>.', 'Dictionaries: <code>user = {"name": "Asha"}</code>, read with <code>user["name"]</code>.', 'Slicing: <code>nums[1:3]</code> returns a new list.', 'List comprehensions build lists in one line: <code>[n*n for n in nums]</code>.']),
            r('Functions package reusable logic. Define them with <code>def</code>, give them parameters, and send results back with <code>return</code>. Modules are simply .py files you can <code>import</code>, letting you split a large program into organised pieces and reuse the standard library.',
              ['Default arguments: <code>def greet(name="friend")</code>.', 'A function without <code>return</code> gives back <code>None</code>.', '<code>import math</code> or <code>from math import sqrt</code> both work.', 'Keep functions small - one function, one job.']),
            r('Real programs read and write files and talk to web services. Use <code>with open("data.txt") as f</code> so files close automatically. For JSON files use the <code>json</code> module, and for web APIs the <code>requests</code> library returns data you can convert straight into dictionaries.',
              ['Modes: <code>"r"</code> read, <code>"w"</code> overwrite, <code>"a"</code> append.', '<code>json.load(f)</code> reads JSON into Python objects.', 'Always check <code>response.status_code</code> before using API data.', 'Wrap risky code in <code>try / except</code> to handle errors gracefully.']),
            r('In the capstone you combine everything into one automation script - for example a tool that renames files in a folder, reads a CSV of contacts and writes a summary report. Plan first: list inputs, steps and outputs, then build and test one small piece at a time.',
              ['Break the project into small functions.', 'Test with sample data before using real files.', 'Add clear messages so users know what the script did.', 'Push the finished project to GitHub as part of your portfolio.']),
        ],
    },
    'fullstack-dev': {
        video: V.blaze,
        modules: [
            r('Every web page is built from HTML (structure), CSS (appearance) and, later, JavaScript (behaviour). Semantic tags such as <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code> and <code>&lt;footer&gt;</code> describe meaning, while CSS Flexbox and Grid arrange content. Responsive design makes one page fit phones, tablets and desktops.',
              ['Use media queries: <code>@media (max-width: 768px)</code>.', 'Flexbox is best for one-dimensional rows or columns; Grid for two-dimensional layouts.', 'Relative units (<code>rem</code>, <code>%</code>) scale better than fixed pixels.', 'Always include the viewport meta tag.']),
            r('JavaScript makes pages interactive. You declare variables with <code>let</code> and <code>const</code>, write functions, and react to user actions with event listeners. The DOM is the live tree of page elements that JavaScript can read and change.',
              ['<code>document.querySelector()</code> finds an element.', '<code>addEventListener("click", fn)</code> reacts to clicks.', 'Arrays have helpers like <code>map</code>, <code>filter</code> and <code>reduce</code>.', 'Use <code>===</code> (strict equality) rather than <code>==</code>.']),
            r('Frameworks such as React split a page into reusable components. A component is a function returning JSX; data passed in is called props and data that changes over time is called state. When state changes, React updates only the parts of the page that need it.',
              ['Components start with a capital letter.', '<code>useState</code> stores changing values.', '<code>useEffect</code> runs code after rendering (fetching data, timers).', 'React Router maps URLs to page components.']),
            r('The backend receives requests from the browser, runs logic and returns data. A REST API uses URLs for resources and HTTP methods for actions: GET reads, POST creates, PUT/PATCH updates and DELETE removes. With Node.js and Express you can build these endpoints in JavaScript.',
              ['Return JSON with correct status codes (200, 201, 400, 404, 500).', 'Validate all incoming data on the server.', 'Use environment variables for secrets - never hard-code them.', 'Enable CORS only for the sites that need it.']),
            r('Most apps store data in a database. SQL databases (PostgreSQL, MySQL) use tables and relations; NoSQL databases (MongoDB) store flexible documents. Once the app works, deployment publishes it: build the frontend, host the API, connect the database and set environment variables on the server.',
              ['Never build SQL queries by joining strings - use parameters to prevent injection.', 'Hash passwords with bcrypt before saving them.', 'Use Git so every deployment can be traced and rolled back.', 'Monitor logs after release to catch problems early.']),
        ],
    },
    'ai-foundations': {
        video: V.escape,
        modules: [
            r('Artificial Intelligence is the field of building systems that perform tasks normally needing human intelligence, such as understanding language, recognising images and making decisions. Machine learning is a subset where systems learn patterns from data instead of following hand-written rules.',
              ['Narrow AI solves one task; general AI (hypothetical) would match human ability broadly.', 'Three learning styles: supervised, unsupervised and reinforcement.', 'Data quality matters as much as the algorithm.', 'AI systems can inherit bias from their training data.']),
            r('Many AI problems are searches for the best sequence of actions. Uninformed methods such as breadth-first and depth-first search explore blindly, while informed methods like A* use a heuristic estimate of the remaining distance to reach goals faster. Optimisation techniques such as gradient descent search for the best numeric settings.',
              ['BFS finds the shortest path in unweighted graphs.', 'A* combines path cost so far with a heuristic estimate.', 'A good heuristic never overestimates the true cost.', 'Gradient descent moves step by step downhill on an error surface.']),
            r('A neural network is layers of simple units (neurons). Each neuron multiplies its inputs by weights, adds a bias and passes the result through an activation function such as ReLU or sigmoid. Stacking layers lets the network learn complex patterns like faces or speech.',
              ['Input layer receives data, hidden layers transform it, output layer predicts.', 'Weights are the values learned during training.', 'Activation functions add non-linearity - without them the network is just a line.', 'Deeper networks can learn richer features but need more data.']),
            r('Training adjusts the weights to reduce error. The model makes a prediction, a loss function measures how wrong it was, and backpropagation works out how each weight should change. Data is split into training, validation and test sets so you can detect overfitting - when a model memorises instead of generalises.',
              ['Typical split: 70% train, 15% validation, 15% test.', 'Learning rate controls the step size of each update.', 'Overfitting: great training score, poor test score.', 'Regularisation and more data help reduce overfitting.']),
            r('For the capstone you build a simple classifier, for example one that labels flowers or spam emails. Load a dataset, clean it, split it, train a model, then evaluate accuracy and mistakes. Finish by writing a short note explaining what worked and what you would improve.',
              ['Start with a simple baseline model.', 'Use a confusion matrix to see which classes get mixed up.', 'Change one thing at a time when tuning.', 'Document your results so others can reproduce them.']),
        ],
    },
    'gen-ai': {
        video: V.fun,
        modules: [
            r('Modern language models are built on the Transformer architecture. Its key idea is self-attention: every word in a sentence looks at every other word to decide what is relevant, allowing the model to understand context and long-distance relationships. Text is first split into tokens, which are turned into numeric vectors called embeddings.',
              ['Tokens are pieces of words, not always whole words.', 'Attention lets the model focus on the most relevant tokens.', 'Models generate text one token at a time, predicting the next likely token.', 'Larger models with more data usually show stronger abilities.']),
            r('Prompt engineering is the skill of asking a model clearly. Good prompts state the role, task, context, format and any constraints. Giving one or two examples (few-shot prompting) often improves reliability, and asking the model to reason step by step helps on multi-step problems.',
              ['Be specific: audience, length, tone and format.', 'Provide examples of the output you want.', 'Break big tasks into smaller prompts.', 'Always verify important facts - models can produce confident mistakes (hallucinations).']),
            r('Fine-tuning continues training a pretrained model on your own examples so it adopts a style or domain. Full fine-tuning updates all weights and is expensive; parameter-efficient methods such as LoRA train only small adapter layers, cutting cost dramatically.',
              ['Use fine-tuning for style or format; use retrieval for fresh facts.', 'Quality of examples matters more than quantity.', 'Keep a separate evaluation set to check improvement.', 'Watch for the model forgetting general skills.']),
            r('A context window is the amount of text a model can consider at once. When your knowledge base is larger than the window, Retrieval-Augmented Generation (RAG) helps: documents are split into chunks, stored as embeddings in a vector database, and the most relevant chunks are inserted into the prompt at question time.',
              ['Chunk size affects retrieval quality - test different sizes.', 'Cite the source chunk so answers can be checked.', 'RAG reduces hallucination by grounding answers in documents.', 'Longer context costs more time and money.']),
            r('Deploying an LLM app means wrapping the model in an API, adding a user interface and putting safeguards around it. Track latency, cost and quality, protect against prompt injection, and never send private data to a service you have not approved.',
              ['Add rate limits and input validation.', 'Log prompts and outputs (respecting privacy) to improve quality.', 'Provide a fallback when the model fails.', 'Keep a human in the loop for high-stakes decisions.']),
        ],
    },
    'cyber-security': {
        video: V.joy,
        modules: [
            r('Network security protects data as it moves between devices. Core ideas are the CIA triad - Confidentiality, Integrity and Availability. Firewalls filter traffic by rules, VPNs encrypt connections across untrusted networks, and segmentation keeps a breach in one area from spreading to all.',
              ['Know the layers: IP addresses, ports, protocols (TCP, UDP, HTTP, DNS).', 'Close every port you do not need.', 'Use HTTPS/TLS for all web traffic.', 'Apply the principle of least privilege to accounts.']),
            r('Threat modelling asks: what are we protecting, who might attack, and how? The STRIDE method lists threat types - Spoofing, Tampering, Repudiation, Information disclosure, Denial of service and Elevation of privilege. Ranking risks by likelihood and impact tells you where to spend effort first.',
              ['Draw the system and mark where data crosses trust boundaries.', 'List assets, attackers and possible attack paths.', 'Rate each risk, then pick controls.', 'Revisit the model whenever the system changes.']),
            r('Penetration testing is authorised, ethical hacking to find weaknesses before criminals do. The usual phases are reconnaissance, scanning, gaining access, maintaining access and reporting. Always work with written permission and a clearly defined scope.',
              ['Never test systems you do not have permission to test.', 'Tools like Nmap map open ports and services.', 'Document every step and finding.', 'A good report explains impact and how to fix each issue.']),
            r('Cryptography protects secrecy and authenticity. Symmetric encryption (AES) uses one shared key and is fast; asymmetric encryption (RSA, ECC) uses a public/private key pair and solves key exchange. Hash functions such as SHA-256 create fixed fingerprints of data and are used to verify integrity.',
              ['Never invent your own cryptographic algorithm.', 'Store passwords using slow, salted hashes (bcrypt, Argon2).', 'Digital signatures prove who created a message.', 'Keep private keys secret and rotate keys regularly.']),
            r('Incident response is how an organisation handles an attack. The lifecycle is Preparation, Detection, Containment, Eradication, Recovery and Lessons learned. Having a tested plan and clear roles reduces damage and recovery time.',
              ['Keep offline, tested backups.', 'Isolate affected machines quickly.', 'Preserve logs and evidence.', 'Hold a review afterwards and update your defences.']),
        ],
    },
    'data-analytics': {
        video: V.melt,
        modules: [
            r('Statistics helps you describe and understand data. Measures of centre (mean, median, mode) and spread (range, variance, standard deviation) summarise a dataset. Probability describes how likely events are, and the normal distribution appears in many natural measurements.',
              ['Median is more robust than mean when outliers exist.', 'Standard deviation shows how far values typically sit from the mean.', 'Correlation does not prove causation.', 'Sample size affects how much you can trust a result.']),
            r('Real data is messy. Pandas gives you DataFrames - tables you can filter, group and reshape. Data wrangling covers loading files, fixing types, handling missing values, removing duplicates and joining tables so the data is ready for analysis.',
              ['<code>df.head()</code> and <code>df.info()</code> give a quick overview.', '<code>df.dropna()</code> or <code>df.fillna()</code> handle missing values.', '<code>df.groupby("city")["sales"].sum()</code> summarises by group.', '<code>pd.merge()</code> joins two tables on a key.']),
            r('Visualisation turns numbers into insight. Choose the chart to match the question: lines for trends over time, bars for comparing categories, scatter plots for relationships, histograms for distributions. Clear titles, labelled axes and limited colours make charts honest and readable.',
              ['Avoid 3-D and heavily decorated charts.', 'Start bar-chart axes at zero.', 'Highlight the one message you want viewers to remember.', 'Use Matplotlib or Seaborn for quick Python charts.']),
            r('Tableau lets you build interactive dashboards by dragging fields onto rows, columns and marks. Connect to a data source, create sheets for each chart, then combine sheets into a dashboard with filters so viewers can explore on their own.',
              ['Dimensions are categories; measures are numbers.', 'Use filters and parameters for interactivity.', 'Keep dashboards focused on a few key questions.', 'Test the dashboard on the screen size your audience will use.']),
            r('In the capstone you take a real dataset from question to presentation: define a question, clean the data, analyse it, visualise the findings and write a short story with recommendations. Explain your method so others can trust and repeat it.',
              ['Start with a clear business question.', 'Record every cleaning step.', 'Show both what the data says and its limits.', 'End with clear, actionable recommendations.']),
        ],
    },
    'cross-platform-mobile': {
        video: V.blaze,
        modules: [
            r('Good mobile UI is built for thumbs and small screens. Follow platform guidelines, keep tap targets at least 44 pixels, use readable font sizes and give instant visual feedback when users touch something. Layouts are made from nested rows, columns and stacks that adapt to different screen sizes.',
              ['Design for one-handed use.', 'Support both portrait and landscape where sensible.', 'Respect safe areas such as notches and home indicators.', 'Test on small and large devices.']),
            r('Cross-platform frameworks such as React Native and Flutter let one codebase produce both iOS and Android apps. React Native uses JavaScript and native components; Flutter uses Dart and draws its own widgets. Both offer hot reload so you see changes instantly.',
              ['Pick the framework your team can maintain.', 'Share business logic; adjust UI details per platform if needed.', 'Use hot reload to iterate quickly.', 'Keep dependencies few and up to date.']),
            r('State is the data your screens depend on. Local state suits small pieces like a text field; shared state (Context, Redux, Provider, Riverpod) suits data used across many screens such as the logged-in user. Keeping a single source of truth avoids screens showing conflicting information.',
              ['Lift state up to the nearest common parent.', 'Avoid duplicating the same data in several places.', 'Persist important state so it survives app restarts.', 'Keep state changes predictable and easy to trace.']),
            r('Native device APIs give apps access to the camera, location, notifications, storage and sensors. Always ask for permission at the moment it is needed, explain why, and handle the case where the user says no.',
              ['Request only the permissions you truly need.', 'Handle denied and restricted permissions gracefully.', 'Test on real devices - emulators cannot reproduce every sensor.', 'Save battery by limiting background location and network use.']),
            r('Publishing means creating store listings, app icons, screenshots and a privacy policy, then building a signed release. Apple and Google review every submission, so follow their content and data-use rules carefully. After release, monitor crash reports and reviews and ship updates regularly.',
              ['Increment the version and build number for every release.', 'Test the release build, not just the debug build.', 'Provide a clear privacy policy.', 'Respond to user reviews and fix crashes quickly.']),
        ],
    },
    'advanced-mobile': {
        video: V.escape,
        modules: [
            r('Architecture patterns organise code so apps stay maintainable as they grow. MVVM separates the interface from the logic that prepares data for it; Clean Architecture goes further with layers for UI, business rules and data. Dependency injection makes each part easy to swap and test.',
              ['UI shows data; it should hold little logic.', 'Business rules live in their own testable layer.', 'Repositories hide whether data comes from network or storage.', 'Small, single-purpose classes are easier to change.']),
            r('Asynchronous programming keeps apps responsive. Long tasks such as network calls must never block the main (UI) thread. Kotlin coroutines, Swift async/await and Futures let you write asynchronous code that reads almost like normal step-by-step code.',
              ['Do network and disk work off the main thread.', 'Handle errors and time-outs for every request.', 'Cancel work that is no longer needed when a screen closes.', 'Show loading and error states to the user.']),
            r('Every screen has a lifecycle: it is created, shown, paused, resumed and destroyed - sometimes unexpectedly when the system needs memory or the device rotates. Saving state at the right moments and releasing resources such as listeners and cameras prevents crashes and leaks.',
              ['Save user input before the screen is paused.', 'Release resources when the screen is destroyed.', 'Do not keep references to destroyed screens.', 'Test rotation and returning from the background.']),
            r('Reactive structures treat data as streams that update the interface automatically. Observables, Flow, Combine and StateFlow push new values to the screens that watch them, removing the need to refresh the UI by hand and keeping everything consistent.',
              ['Expose read-only streams from the logic layer.', 'Collect streams in the UI and redraw when values change.', 'Combine several streams into one screen state.', 'Stop observing when the screen is no longer visible.']),
            r('Performance affects reviews and retention. Measure before optimising: use the platform profilers to find slow frames, memory leaks and battery drain. Common fixes include lazy loading lists, caching images, reducing overdraw and batching network calls.',
              ['Aim for smooth 60 frames per second scrolling.', 'Use list components that recycle views.', 'Compress and cache images.', 'Reduce app start-up work and defer non-essential tasks.']),
        ],
    },
    'reinforcement-learning': {
        video: V.joy,
        modules: [
            r('In reinforcement learning an agent interacts with an environment: it observes a state, takes an action and receives a reward. The goal is to learn a policy - a strategy for choosing actions - that maximises total reward over time. This is modelled mathematically as a Markov Decision Process.',
              ['Key terms: state, action, reward, policy, value.', 'The discount factor (gamma) controls how much future rewards matter.', 'Exploration tries new actions; exploitation uses what is known to work.', 'Rewards must be designed carefully or the agent may find unwanted shortcuts.']),
            r('Q-learning learns the value of taking each action in each state, stored in a Q-table. After every step the value is nudged toward the reward plus the best estimated future value. An epsilon-greedy rule picks a random action sometimes to keep exploring.',
              ['Update: Q(s,a) moves toward reward + gamma x max Q(next state).', 'Learning rate (alpha) sets how fast values change.', 'Start with high epsilon and reduce it over time.', 'Q-tables become impractical for huge state spaces - use neural networks (DQN) instead.']),
            r('Policy gradient methods learn the policy directly instead of learning values first. The agent runs episodes, and actions that led to high rewards become more likely. REINFORCE is the simplest version; it is powerful but can be noisy, so baselines are used to reduce variance.',
              ['Works well for continuous or very large action spaces.', 'Gradient ascent increases the probability of good actions.', 'Subtracting a baseline stabilises training.', 'Training may need many episodes.']),
            r('Actor-Critic methods combine both ideas: the actor chooses actions (the policy) while the critic estimates how good the situation is (the value). The critic gives lower-noise feedback so the actor learns faster. A2C, A3C and PPO are popular algorithms in this family.',
              ['The advantage tells how much better an action was than average.', 'PPO limits how much the policy changes per update for stability.', 'Use several parallel environments to collect data faster.', 'Track average reward per episode to see learning progress.']),
            r('For the capstone you train an agent to solve a task such as balancing a pole or landing a spacecraft in a simulator. Define the environment, choose an algorithm, train, plot reward curves and record a demonstration of the trained agent.',
              ['Start with a simple environment before a complex one.', 'Fix random seeds so results can be reproduced.', 'Try several hyperparameter settings.', 'Report failures as well as successes.']),
        ],
    },
    'nlp': {
        video: V.fun,
        modules: [
            r('Before a model can read text, the text must be cleaned and split. Common steps are lowercasing, removing noise, tokenisation (splitting into words or sub-words), stop-word removal and stemming or lemmatisation, which reduce words such as "running" to a base form.',
              ['Modern models use sub-word tokenisers like BPE or WordPiece.', 'Lemmatisation gives real words; stemming just trims endings.', 'Keep punctuation if it matters (for example sentiment).', 'Apply exactly the same preprocessing at training and prediction time.']),
            r('Language is a sequence, so models must remember earlier words. Recurrent networks (RNN, LSTM, GRU) process one word at a time while carrying a memory. They handle sequences well but struggle with very long text and are slow to train because steps happen one after another.',
              ['LSTM gates decide what to remember and forget.', 'Word embeddings map words to vectors with similar meanings close together.', 'Sequence-to-sequence models read one sequence and write another.', 'Long-range dependencies are hard for plain RNNs.']),
            r('Transformers replaced recurrent models for most NLP tasks. Self-attention lets every word consider all others at once, and the computation runs in parallel, so training is much faster. Pretrained models such as BERT and GPT are fine-tuned for classification, question answering and more.',
              ['BERT reads text in both directions - great for understanding.', 'GPT-style models generate text left to right.', 'Fine-tuning a pretrained model needs far less data than training from scratch.', 'Hugging Face provides ready-to-use models.']),
            r('Machine translation converts text between languages, and summarisation shortens documents while keeping the main ideas. Extractive summaries select important sentences; abstractive summaries write new sentences. Quality is measured with metrics such as BLEU and ROUGE, but human review is still important.',
              ['Translation models learn from large parallel text collections.', 'Abstractive summaries can invent facts - check them.', 'BLEU and ROUGE compare output with reference texts.', 'Domain-specific vocabulary needs extra tuning.']),
            r('In the capstone you build a small NLP application such as a sentiment analyser, a question-answering bot or a news summariser. Pick a dataset, choose a pretrained model, evaluate it, and wrap it in a simple interface that others can try.',
              ['Define what a good result looks like first.', 'Compare at least two approaches.', 'Test on unusual sentences to find weaknesses.', 'Explain limitations to the people who will use it.']),
        ],
    },
    'mlops': {
        video: V.melt,
        modules: [
            r('An ML pipeline turns raw data into a deployed model through repeatable stages: data ingestion, validation, feature engineering, training, evaluation and deployment. Automating each stage means results can be reproduced and improved without manual, error-prone steps.',
              ['Version your data, code and models together.', 'Validate data before training - bad data means bad models.', 'Keep feature calculation identical in training and production.', 'Use tools like MLflow or Kubeflow to track experiments.']),
            r('Models degrade after release because the world changes. Data drift means input data looks different from training data; concept drift means the relationship between inputs and outcomes changes. Monitoring accuracy, input distributions, latency and errors helps you notice problems early.',
              ['Set alerts on key metrics.', 'Compare live data with the training data distribution.', 'Collect true outcomes so accuracy can be measured later.', 'Plan when and how to retrain the model.']),
            r('CI/CD for ML extends software practice: every change triggers automated tests, then a pipeline that retrains, validates and deploys the model if it passes quality gates. Tests cover code, data and model performance, and rollbacks bring back the previous version if something goes wrong.',
              ['Add unit tests for data and feature code.', 'Block deployment if accuracy drops below the threshold.', 'Deploy gradually (canary or shadow) before full release.', 'Keep every model version so you can roll back.']),
            r('Orchestration tools such as Airflow, Prefect and Kubeflow Pipelines schedule and connect tasks, retry failures and record what ran. Workflows are defined as graphs where each task depends on earlier ones, making complex jobs visible and manageable.',
              ['Design tasks to be idempotent - safe to re-run.', 'Set retries and time-outs for each task.', 'Schedule retraining based on time or on drift signals.', 'Store logs centrally for troubleshooting.']),
            r('For the capstone you deploy a model behind an API with automated tests, monitoring and a retraining workflow. Package the model in a container, expose a prediction endpoint, add health checks and dashboards, and document how to operate it.',
              ['Containerise with Docker for consistent environments.', 'Add a health-check endpoint.', 'Log every prediction request for later analysis.', 'Write a short runbook for on-call support.']),
        ],
    },
    'devops': {
        video: V.blaze,
        modules: [
            r('Containers package an application together with everything it needs to run, so it behaves the same on a laptop, a test server and in the cloud. Docker builds images from a Dockerfile and runs them as isolated containers that start in seconds and use fewer resources than virtual machines.',
              ['<code>docker build -t app .</code> creates an image.', '<code>docker run -p 8080:80 app</code> starts a container.', 'Keep images small and use official base images.', 'Never store secrets inside an image.']),
            r('Kubernetes runs and manages many containers across many machines. You describe the desired state - for example, three copies of a service - and Kubernetes keeps it true by restarting failed containers and spreading load. Core objects are Pods, Deployments and Services.',
              ['A Pod is the smallest deployable unit.', 'A Deployment maintains the desired number of Pods and handles updates.', 'A Service gives Pods a stable network address.', '<code>kubectl apply -f file.yaml</code> applies configuration.']),
            r('A CI/CD pipeline automatically builds, tests and delivers code. Continuous Integration merges and tests changes frequently; Continuous Delivery/Deployment ships passing builds to staging or production. Fast feedback makes releases smaller, safer and more frequent.',
              ['Run tests on every push.', 'Build an artifact once and deploy the same artifact everywhere.', 'Use approvals for production if required.', 'Keep pipelines fast - slow pipelines get bypassed.']),
            r('Infrastructure as Code describes servers, networks and databases in text files instead of clicking through consoles. Tools such as Terraform and CloudFormation create identical environments on demand and record every change in version control.',
              ['Store IaC in Git and review changes like code.', 'Use separate state and variables for each environment.', 'Run a plan/preview before applying changes.', 'Avoid manual changes that cause configuration drift.']),
            r('Monitoring tells you whether a system is healthy. Metrics (Prometheus, Grafana) show numbers over time, logs record events, and traces follow a request through many services. Alerts should point to real user impact and always come with a clear action.',
              ['Watch the four golden signals: latency, traffic, errors and saturation.', 'Centralise logs so they can be searched.', 'Avoid noisy alerts - they are ignored.', 'Write post-incident reviews without blame.']),
        ],
    },
};

/** Returns { video, reading } for a built-in course module, or null. */
export function getLesson(courseId, moduleIndex) {
    const course = LESSONS[courseId];
    if (!course || !course.modules[moduleIndex]) return null;
    return { video: course.video, reading: course.modules[moduleIndex] };
}