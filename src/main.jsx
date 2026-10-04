import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Check,
  Plus,
  Minus,
  Menu,
  X,
  Wallet,
  Target,
  MoveUpRight,
  ShieldCheck,
  Compass,
  BookOpen,
  Sprout,
  ArrowDownLeft,
  Coffee,
  Home,
  Plane,
  CircleHelp,
} from 'lucide-react';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/dm-sans/latin-700.css';
import '@fontsource/fraunces/latin-400.css';
import '@fontsource/fraunces/latin-400-italic.css';
import './styles.css';

const money = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
function navigateTabs(event) {
  const tabs = Array.from(event.currentTarget.querySelectorAll('[role="tab"]'));
  const index = tabs.indexOf(document.activeElement);
  let next;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
    next = (index - 1 + tabs.length) % tabs.length;
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = tabs.length - 1;
  if (next !== undefined) {
    event.preventDefault();
    tabs[next].focus();
    tabs[next].click();
  }
}
const goals = {
  cushion: {
    label: 'A rainy day fund',
    icon: ShieldCheck,
    title: 'A little peace of mind.',
    description: 'An unexpected bill feels different when you have something set aside.',
    total: 150000,
    saved: 45000,
    color: '#dce8c6',
  },
  travel: {
    label: 'A proper getaway',
    icon: Plane,
    title: 'More room to explore.',
    description: 'The trip you keep talking about can start with a small monthly habit.',
    total: 90000,
    saved: 30000,
    color: '#ead8c6',
  },
  home: {
    label: 'A place of your own',
    icon: Home,
    title: 'Your next chapter.',
    description: 'Break a big down payment goal into steps you can see and work towards.',
    total: 1000000,
    saved: 200000,
    color: '#d8e4e7',
  },
};

function Brand({ light = false }) {
  return (
    <a className={`brand ${light ? 'light' : ''}`} href="#top" aria-label="Fermor home">
      <span className="brand-icon" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      fermor<span className="brand-dot">.</span>
    </a>
  );
}

function GrowthChart({ period }) {
  const paths = {
    '1M': 'M0 110 C35 108 45 92 75 98 S120 72 150 81 S200 42 228 52 S270 12 300 17',
    '3M': 'M0 130 C30 124 45 135 70 105 S120 119 145 85 S190 100 215 59 S270 68 300 17',
    '6M': 'M0 135 C25 130 35 143 58 121 S98 130 122 99 S152 115 178 75 S218 81 239 49 S278 57 300 17',
  };
  return (
    <svg
      className="growth-chart"
      viewBox="0 0 300 155"
      role="img"
      aria-label={`Illustrative net worth trend over ${period}`}
    >
      <defs>
        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bad783" stopOpacity=".55" />
          <stop offset="100%" stopColor="#bad783" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[35, 80, 125].map((y) => (
        <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#dae2d3" strokeDasharray="3 5" />
      ))}
      <path d={`${paths[period]} L300 155 L0 155 Z`} fill="url(#chart-fill)" />
      <path d={paths[period]} fill="none" stroke="#477348" strokeWidth="2.5" />
      <circle cx="300" cy="17" r="4" fill="#477348" />
    </svg>
  );
}

function Dashboard() {
  const [tab, setTab] = useState('Overview');
  const [period, setPeriod] = useState('6M');
  return (
    <div className="dashboard-scene">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="dashboard">
        <div className="dash-header">
          <div className="mini-brand">
            <Sprout size={19} /> Your money, together.
          </div>
          <span className="avatar" aria-label="Sample user initials">
            AK
          </span>
        </div>
        <div
          className="dash-tabs"
          role="tablist"
          aria-label="Sample financial overview"
          onKeyDown={navigateTabs}
        >
          {['Overview', 'Goals', 'Activity'].map((item) => (
            <button
              key={item}
              role="tab"
              tabIndex={tab === item ? 0 : -1}
              id={`tab-${item}`}
              aria-controls="dashboard-panel"
              aria-selected={tab === item}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}
          <span className="sample-label">SAMPLE DATA</span>
        </div>
        <div
          className="dash-body"
          id="dashboard-panel"
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
        >
          {tab === 'Overview' && (
            <>
              <div className="balance-heading">
                <span>Your net worth</span>
                <span className="subtle">
                  All accounts <ChevronDown size={12} />
                </span>
              </div>
              <div className="balance">
                ₹8,42,500
                <span className="growth">
                  <MoveUpRight size={12} /> 8.2%
                </span>
              </div>
              <div className="chart-heading">
                <span>Little by little, it adds up.</span>
                <div className="periods" aria-label="Chart period">
                  {['1M', '3M', '6M'].map((p) => (
                    <button key={p} aria-pressed={period === p} onClick={() => setPeriod(p)}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <GrowthChart period={period} />
              <div className="chart-months">
                {(period === '6M'
                  ? ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
                  : period === '3M'
                    ? ['Jul', 'Aug', 'Sep']
                    : ['Week 1', 'Week 2', 'Week 3', 'Week 4']
                ).map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
              <div className="account-row">
                <span>
                  <i className="legend-dot savings" />
                  Savings
                </span>
                <strong>₹2,15,000</strong>
              </div>
              <div className="account-row">
                <span>
                  <i className="legend-dot investments" />
                  Investments
                </span>
                <strong>₹6,27,500</strong>
              </div>
              <div className="dash-insight">
                <span className="insight-icon">
                  <Sprout size={18} />
                </span>
                <div>
                  <strong>A good habit, taking root.</strong>
                  <p>You set aside ₹12,000 this month.</p>
                </div>
                <Check size={16} />
              </div>
            </>
          )}
          {tab === 'Goals' && (
            <div className="dash-alternative">
              <span className="eyebrow">THE THINGS YOU’RE BUILDING</span>
              <h3>One step closer.</h3>
              {Object.entries(goals).map(([key, goal]) => (
                <div className="mini-goal" key={key}>
                  <div>
                    <goal.icon size={16} />
                    <strong>{goal.label}</strong>
                  </div>
                  <span>
                    {money(goal.saved)} of {money(goal.total)}
                  </span>
                  <div className="progress-track">
                    <i style={{ width: `${(goal.saved / goal.total) * 100}%` }} />
                  </div>
                </div>
              ))}
              <p className="dash-note">Sample balances. Your goals, at your pace.</p>
            </div>
          )}
          {tab === 'Activity' && (
            <div className="dash-alternative">
              <span className="eyebrow">SEPTEMBER AT A GLANCE</span>
              <h3>The everyday picture.</h3>
              {[
                {
                  icon: ArrowDownLeft,
                  title: 'Salary received',
                  subtitle: '28 Sep · Income',
                  amount: '+ ₹65,000',
                },
                { icon: Home, title: 'Rent', subtitle: '01 Sep · Living', amount: '(₹18,000)' },
                {
                  icon: Target,
                  title: 'Rainy day fund',
                  subtitle: '02 Sep · Goal contribution',
                  amount: '(₹12,000)',
                },
                {
                  icon: Coffee,
                  title: 'Coffee with friends',
                  subtitle: '24 Sep · Eating out',
                  amount: '(₹640)',
                },
              ].map((a) => (
                <div className="activity-row" key={a.title}>
                  <span className="activity-icon">
                    <a.icon size={17} />
                  </span>
                  <div>
                    <strong>{a.title}</strong>
                    <small>{a.subtitle}</small>
                  </div>
                  <b>{a.amount}</b>
                </div>
              ))}
              <p className="dash-note">Illustrative transactions. No accounts connected.</p>
            </div>
          )}
        </div>
      </div>
      <div className="floating-note">
        <span className="note-check">
          <Check size={16} />
        </span>
        <div>
          <strong>Your next step</strong>
          <span>Build a buffer. Breathe a little easier.</span>
        </div>
      </div>
      <div className="handwritten">
        a clearer picture, finally.
        <svg viewBox="0 0 80 45" aria-hidden="true">
          <path
            d="M3 5Q30 40 70 22M60 15l12 6-10 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}

function Landscape({ variant }) {
  return (
    <svg
      viewBox="0 0 500 300"
      preserveAspectRatio="xMidYMid slice"
      className="landscape"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grain" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r=".6" fill="#173e31" opacity=".15" />
        </pattern>
      </defs>
      <rect width="500" height="300" fill={goals[variant].color} />
      <circle cx="358" cy="83" r="40" fill="#f8f1df" />
      <path d="M0 211Q100 115 238 221T500 186V300H0Z" fill="#8daa79" />
      <path d="M0 247Q161 159 311 243T500 226V300H0Z" fill="#48705a" />
      <path
        d="M225 300Q299 258 256 229Q218 204 316 183Q345 174 322 158"
        fill="none"
        stroke="#ede8c6"
        strokeWidth="14"
      />
      <path
        d="M77 230v-59m0 12q-30-35-21-45 29-1 21 45m0 15q32-31 24-41-27 0-24 41"
        fill="#315444"
        stroke="#315444"
        strokeWidth="3"
      />
      <rect width="500" height="300" fill="url(#grain)" />
      {variant === 'home' && (
        <g>
          <path d="M354 196v-43l29-21 30 21v43" fill="#eee8d6" />
          <path d="M346 155l37-29 37 29" stroke="#173e31" strokeWidth="6" fill="none" />
          <path d="M376 195v-25h14v25" fill="#8daa79" />
        </g>
      )}
    </svg>
  );
}

const articles = [
  {
    label: 'THE BASICS',
    title: 'Your money needs a map, not more tabs.',
    time: '3 min read',
    theme: 'map',
    paragraphs: [
      'Start with four numbers: what comes in, what goes out, what you own, and what you owe. You can use a notebook, a spreadsheet, or a simple overview. The useful part is seeing everything together.',
      'Look at a typical month rather than your best one. Include bills that arrive once a year by setting aside a little each month. A clearer picture helps you spot commitments before they become surprises.',
      'Once you have the picture, pick one thing to improve. You do not need to organise your entire financial life in an afternoon. A quick review each month is a good place to begin.',
    ],
  },
  {
    label: 'EVERYDAY HABITS',
    title: 'Make saving a part of payday.',
    time: '2 min read',
    theme: 'habit',
    paragraphs: [
      'Saving whatever is left at the end of the month can be hard to stick with. Instead, decide on an amount that fits your actual income and commitments, and set it aside when you are paid.',
      'Start with an amount you can maintain. Leave enough for essentials, debt payments, and some breathing room. If a month is expensive, adjust rather than give up on the habit.',
      'Review the amount when your circumstances change. Consistency helps, but a useful plan should also make room for real life.',
    ],
  },
  {
    label: 'SMALL FIRST STEPS',
    title: 'A rainy day fund is a good place to start.',
    time: '3 min read',
    theme: 'buffer',
    paragraphs: [
      'A buffer is money set aside for an unexpected expense or an interruption to your income. The purpose is access when you need it, rather than chasing a return.',
      'Choose an initial target based on your essential expenses. Your job stability, dependants, and existing commitments will affect how much feels appropriate. You can build the target in stages.',
      'Keep this money separate from everyday spending and check how quickly you can access it. Revisit your target when your bills or responsibilities change. These are general educational ideas, not a personal recommendation.',
    ],
  },
];

const faqs = [
  [
    'What is Fermor?',
    'Fermor is building a simpler way to understand, act on, and grow your financial life. This homepage explores that idea through a clear overview, practical next steps, and everyday money habits.',
  ],
  [
    'Do I need to know a lot about finance?',
    'No. This experience starts with familiar things: your monthly spending, the money you set aside, and the things you want to work towards. Financial terms should help you understand, not get in your way.',
  ],
  [
    'Can I connect my bank account here?',
    'This is a frontend assignment concept, so the overview uses sample data. There are no bank connections, account registrations, or payments. The goal planner works with the numbers you enter, directly in your browser.',
  ],
  [
    'How does the goal planner work?',
    'It subtracts your monthly expenses from your income after deductions to show the amount available. You choose a monthly contribution, and it estimates how many months you need to reach your target. It assumes no interest or investment returns. Your inputs are not saved or sent to a server.',
  ],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [goal, setGoal] = useState('cushion');
  const [monthly, setMonthly] = useState(5000);
  const [openFaq, setOpenFaq] = useState(0);
  const [modal, setModal] = useState(null);
  const [income, setIncome] = useState('65000');
  const [expenses, setExpenses] = useState('40000');
  const [target, setTarget] = useState('150000');
  const [contribution, setContribution] = useState('5000');
  const [plan, setPlan] = useState(null);
  const dialog = useRef(null);
  useEffect(() => {
    if (modal !== null && !dialog.current.open) dialog.current.showModal();
  }, [modal]);
  const activeGoal = goals[goal];
  const months = Math.ceil((activeGoal.total - activeGoal.saved) / monthly);
  function openModal(content) {
    setModal(content);
    setPlan(null);
  }
  function closeModal() {
    dialog.current.close();
    setModal(null);
  }
  function buildPlan(event) {
    event.preventDefault();
    const available = Number(income) - Number(expenses);
    if (available <= 0) {
      setPlan({
        error:
          'There’s no room for a contribution with these numbers. Try reviewing your expenses or choosing a smaller first step.',
      });
      return;
    }
    if (Number(contribution) > available) {
      setPlan({
        error: `You have ${money(available)} available each month. Choose a contribution within that amount.`,
      });
      return;
    }
    setPlan({
      available,
      months: Math.ceil(Number(target) / Number(contribution)),
      contribution: Number(contribution),
    });
  }
  const navItems = [
    ['The idea', '#the-idea'],
    ['Your goals', '#your-goals'],
    ['Money notes', '#money-notes'],
  ];
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header" id="top">
        <div className="nav-wrap">
          <Brand />
          <nav
            id="mobile-navigation"
            className={menuOpen ? 'nav-links is-open' : 'nav-links'}
            aria-label="Main navigation"
          >
            {navItems.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <button
              className="mobile-start"
              onClick={() => {
                setMenuOpen(false);
                openModal('planner');
              }}
            >
              Find my starting point <ArrowUpRight size={16} />
            </button>
          </nav>
          <button className="nav-cta" onClick={() => openModal('planner')}>
            Find my starting point <ArrowUpRight size={16} />
          </button>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="status-dot" /> MAKE SPACE FOR WHAT’S NEXT
            </div>
            <h1>
              Life has plans.
              <br />
              Give your money
              <br />a <em>little direction.</em>
            </h1>
            <p className="hero-description">
              See where you stand. Know your next step.
              <br className="desktop-break" /> Build a financial life that feels more like you.
            </p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={() => openModal('planner')}>
                Find my starting point <ArrowUpRight size={18} />
              </button>
              <a className="text-link" href="#the-idea">
                Meet Fermor <ArrowRight size={16} />
              </a>
            </div>
            <div className="hero-footnote">
              <span className="tiny-sprout">
                <Sprout size={16} />
              </span>
              A small first step is still a step forward.
            </div>
          </div>
          <Dashboard />
        </section>
        <section className="principles-strip" aria-label="Our approach">
          <div className="section-wrap">
            <span>
              LESS GUESSWORK.
              <br />
              <strong>MORE CLARITY.</strong>
            </span>
            <div>
              <Wallet size={22} />
              <p>
                Your whole picture,
                <br />
                <strong>in one place.</strong>
              </p>
            </div>
            <div>
              <Compass size={22} />
              <p>
                A next step,
                <br />
                <strong>that makes sense.</strong>
              </p>
            </div>
            <div>
              <Sprout size={22} />
              <p>
                Good habits,
                <br />
                <strong>built over time.</strong>
              </p>
            </div>
          </div>
        </section>
        <section className="idea-section section-wrap" id="the-idea">
          <div className="section-heading">
            <div>
              <span className="eyebrow">UNDERSTAND. ACT. GROW.</span>
              <h2>
                Money is part of life.
                <br />
                It shouldn’t take over yours.
              </h2>
            </div>
            <p>
              Between accounts, bills, and the advice coming from everywhere, it’s easy to lose the
              thread. Let’s bring it back to what matters.
            </p>
          </div>
          <div className="idea-grid">
            <article className="idea-card">
              <span className="card-number">01 / UNDERSTAND</span>
              <div className="mini-visual overview-visual">
                <div>
                  <span>THE WHOLE PICTURE</span>
                  <strong>₹8,42,500</strong>
                </div>
                <div className="stacked-bar">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="visual-labels">
                  <span>Savings</span>
                  <span>Investments</span>
                  <span>Other</span>
                </div>
              </div>
              <h3>See the full picture.</h3>
              <p>
                What you have. What you owe. What’s coming up. Give each piece a place, so the
                bigger picture becomes clear.
              </p>
            </article>
            <article className="idea-card">
              <span className="card-number">02 / ACT</span>
              <div className="mini-visual action-visual">
                <span className="action-circle">
                  <ArrowUpRight size={24} />
                </span>
                <div>
                  <span>ONE MANAGEABLE NEXT STEP</span>
                  <strong>Start your rainy day fund</strong>
                  <span className="action-pill">A little breathing room</span>
                </div>
              </div>
              <h3>Find your next move.</h3>
              <p>
                You don’t have to do everything at once. Start with one useful step that fits where
                you are right now.
              </p>
            </article>
            <article className="idea-card">
              <span className="card-number">03 / GROW</span>
              <div className="mini-visual habit-visual">
                <span>SHOWING UP FOR YOURSELF</span>
                <div className="habit-months">
                  {['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m, i) => (
                    <div key={m}>
                      <i style={{ height: `${25 + i * 9}px` }} />
                      <small>{m}</small>
                    </div>
                  ))}
                </div>
              </div>
              <h3>Keep the momentum.</h3>
              <p>
                Small habits deserve to be noticed. Check in, make adjustments, and see how far
                you’ve come.
              </p>
            </article>
          </div>
          <p className="illustration-note">
            Product illustrations use sample data and show a proposed experience.
          </p>
        </section>
        <section className="goals-section" id="your-goals">
          <div className="section-wrap goals-layout">
            <div className="goal-copy">
              <span className="eyebrow">A NUMBER WITH A REASON BEHIND IT</span>
              <h2>
                You’re not just saving.
                <br />
                You’re <em>making room.</em>
              </h2>
              <p>
                For a little security. A trip you have been planning. A front door with your name on
                it. Start with something that matters to you.
              </p>
              <div
                className="goal-tabs"
                role="tablist"
                aria-orientation="vertical"
                aria-label="Choose a sample goal"
                onKeyDown={navigateTabs}
              >
                {Object.entries(goals).map(([key, g]) => (
                  <button
                    key={key}
                    id={`goal-tab-${key}`}
                    aria-controls="goal-panel"
                    role="tab"
                    tabIndex={goal === key ? 0 : -1}
                    aria-selected={goal === key}
                    onClick={() => setGoal(key)}
                  >
                    <g.icon size={17} />
                    {g.label}
                    <ArrowUpRight size={15} />
                  </button>
                ))}
              </div>
              <div className="goal-caption">
                <span className="tiny-sprout">
                  <Sprout size={18} />
                </span>
                You set the pace. It’s your life.
              </div>
            </div>
            <div
              className="goal-card"
              id="goal-panel"
              role="tabpanel"
              aria-labelledby={`goal-tab-${goal}`}
            >
              <div className="landscape-wrap">
                <Landscape variant={goal} />
                <span className="landscape-tag">
                  <activeGoal.icon size={14} />
                  {activeGoal.label}
                </span>
              </div>
              <div className="goal-card-body">
                <h3>{activeGoal.title}</h3>
                <p>{activeGoal.description}</p>
                <div className="goal-total">
                  <span>
                    {money(activeGoal.saved)} <small>set aside</small>
                  </span>
                  <span>of {money(activeGoal.total)}</span>
                </div>
                <div className="progress-track">
                  <i style={{ width: `${(activeGoal.saved / activeGoal.total) * 100}%` }} />
                </div>
                <label className="range-label" htmlFor="monthly">
                  <span>If you set aside each month</span>
                  <strong>{money(monthly)}</strong>
                </label>
                <input
                  id="monthly"
                  type="range"
                  min="1000"
                  max="20000"
                  step="500"
                  value={monthly}
                  onChange={(e) => setMonthly(Number(e.target.value))}
                />
                <div className="goal-estimate" aria-live="polite">
                  <span>
                    <Target size={16} />
                    Your goal could be
                  </span>
                  <strong>
                    {months} months away <ArrowUpRight size={15} />
                  </strong>
                </div>
                <small className="estimate-note">
                  A simple savings illustration. No interest or returns assumed.
                </small>
              </div>
            </div>
          </div>
        </section>
        <section className="human-section section-wrap">
          <div className="human-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <Sprout />
          </div>
          <div>
            <span className="eyebrow">A MORE HUMAN WAY TO MONEY</span>
            <h2>
              You don’t need to have
              <br />
              it <em>all figured out.</em>
            </h2>
            <p>
              You just need somewhere to start. Fermor’s idea is simple: make your finances easier
              to understand, so taking care of them feels possible.
            </p>
            <a href="#questions" className="text-link">
              A few things you might be wondering <ArrowDownLeft size={17} />
            </a>
          </div>
          <div className="values-list">
            <div>
              <span>01</span>
              <p>
                <strong>Clarity before complexity.</strong>Plain language. A picture you can follow.
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                <strong>Your life, your pace.</strong>Progress that fits your circumstances.
              </p>
            </div>
            <div>
              <span>03</span>
              <p>
                <strong>Small steps count.</strong>Room to begin, and room to change.
              </p>
            </div>
          </div>
        </section>
        <section className="notes-section section-wrap" id="money-notes">
          <div className="section-heading">
            <div>
              <span className="eyebrow">MONEY NOTES</span>
              <h2>
                A little understanding
                <br />
                goes a long way.
              </h2>
            </div>
            <p>A few ideas to make the everyday stuff feel a bit less complicated.</p>
          </div>
          <div className="notes-grid">
            {articles.map((article, i) => (
              <button className="article-card" key={article.title} onClick={() => openModal(i)}>
                <div className={`article-art ${article.theme}`} aria-hidden="true">
                  {i === 0 ? (
                    <>
                      <div className="map-line" />
                      <span className="map-pin">
                        <Compass size={28} />
                      </span>
                      <i className="map-point" />
                    </>
                  ) : i === 1 ? (
                    <>
                      <span className="calendar-title">ONE SMALL HABIT</span>
                      <div className="calendar-grid">
                        {Array.from({ length: 21 }, (_, n) => (
                          <span key={n}>{n < 11 ? <Check size={14} /> : n + 1}</span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="buffer-rings" />
                      <ShieldCheck size={52} strokeWidth={1} />
                      <span className="buffer-caption">a little breathing room</span>
                    </>
                  )}
                </div>
                <div className="article-meta">
                  <span>{article.label}</span>
                  <span>{article.time}</span>
                </div>
                <h3>{article.title}</h3>
                <span className="article-link">
                  Read the note <ArrowUpRight size={17} />
                </span>
              </button>
            ))}
          </div>
        </section>
        <section className="faq-section section-wrap" id="questions">
          <div>
            <span className="eyebrow">GOOD QUESTIONS</span>
            <h2>
              Let’s clear
              <br />a few things up.
            </h2>
            <span className="faq-decoration" aria-hidden="true">
              <CircleHelp size={60} strokeWidth={1} />
            </span>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], i) => (
              <div className="faq-item" key={question}>
                <h3>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-${i}`}
                  >
                    {question}
                    {openFaq === i ? <Minus size={19} /> : <Plus size={19} />}
                  </button>
                </h3>
                <div id={`faq-${i}`} hidden={openFaq !== i}>
                  <p>{answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="closing-section">
          <div className="closing-orbit" />
          <div className="section-wrap">
            <span className="eyebrow">YOUR NEXT CHAPTER STARTS SMALL</span>
            <h2>
              A little clarity.
              <br />
              <em>A lot of possibility.</em>
            </h2>
            <p>You don’t have to see the whole path to take the first step.</p>
            <button className="button button-light" onClick={() => openModal('planner')}>
              Find my starting point <ArrowUpRight size={18} />
            </button>
            <span className="closing-note">Try a simple plan. No registration needed.</span>
          </div>
          <Sprout className="closing-sprout" strokeWidth={0.8} />
        </section>
      </main>
      <footer className="site-footer section-wrap">
        <div className="footer-top">
          <div>
            <Brand />
            <p>Understand. Act. Grow.</p>
          </div>
          <nav aria-label="Footer navigation">
            {navItems.map(([label, href]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
            <a href="#questions">Questions</a>
          </nav>
          <a className="back-top" href="#top">
            Back to top <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Fermor homepage concept.</span>
          <span>Built for the frontend assignment using sample data.</span>
        </div>
      </footer>
      <dialog
        ref={dialog}
        aria-label={modal === 'planner' ? 'Your savings starting point' : 'Money note'}
        className="content-dialog"
        onCancel={() => {
          setModal(null);
          setPlan(null);
        }}
        onClick={(e) => {
          if (e.target === dialog.current) closeModal();
        }}
      >
        <button className="dialog-close" aria-label="Close dialog" onClick={closeModal}>
          <X size={22} />
        </button>
        {modal === 'planner' ? (
          <div className="planner">
            <span className="eyebrow">YOUR FIRST SMALL STEP</span>
            <h2>
              Give your goal
              <br />a starting point.
            </h2>
            <p>A simple plan using your monthly numbers. Nothing is saved or sent anywhere.</p>
            <form onSubmit={buildPlan}>
              <div className="form-grid">
                <label>
                  Monthly income after deductions (₹)
                  <input
                    autoFocus
                    required
                    type="number"
                    min="1"
                    max="100000000"
                    step="1"
                    value={income}
                    onChange={(e) => {
                      setIncome(e.target.value);
                      setPlan(null);
                    }}
                  />
                </label>
                <label>
                  Monthly expenses (₹)
                  <input
                    required
                    type="number"
                    min="0"
                    max="100000000"
                    step="1"
                    value={expenses}
                    onChange={(e) => {
                      setExpenses(e.target.value);
                      setPlan(null);
                    }}
                  />
                </label>
                <label>
                  Amount you want to save (₹)
                  <input
                    required
                    type="number"
                    min="1"
                    max="100000000"
                    step="1"
                    value={target}
                    onChange={(e) => {
                      setTarget(e.target.value);
                      setPlan(null);
                    }}
                  />
                </label>
                <label>
                  Monthly goal contribution (₹)
                  <input
                    required
                    type="number"
                    min="1"
                    max="100000000"
                    step="1"
                    value={contribution}
                    onChange={(e) => {
                      setContribution(e.target.value);
                      setPlan(null);
                    }}
                  />
                </label>
              </div>
              <button className="button button-dark" type="submit">
                See my starting point <ArrowRight size={17} />
              </button>
            </form>
            <div aria-live="polite">
              {plan &&
                (plan.error ? (
                  <p className="plan-error">{plan.error}</p>
                ) : (
                  <div className="plan-result">
                    <span>
                      <Check size={17} /> A starting point to work with
                    </span>
                    <p>
                      You have <strong>{money(plan.available)}</strong> available after monthly
                      expenses. Putting aside <strong>{money(plan.contribution)}</strong> a month
                      would reach your target in about{' '}
                      <strong>
                        {plan.months} {plan.months === 1 ? 'month' : 'months'}
                      </strong>
                      .
                    </p>
                    <small>
                      This assumes steady contributions and no interest or returns. Leave room for
                      unexpected expenses.
                    </small>
                  </div>
                ))}
            </div>
          </div>
        ) : typeof modal === 'number' ? (
          <article className="article-dialog">
            <span className="eyebrow">
              {articles[modal].label} · {articles[modal].time}
            </span>
            <h2>{articles[modal].title}</h2>
            {articles[modal].paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="reading-note">
              <BookOpen size={17} /> General education for this homepage concept.
            </div>
          </article>
        ) : null}
      </dialog>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
