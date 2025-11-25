# Contributing to PromptCraft

Terima kasih telah tertarik untuk berkontribusi pada PromptCraft! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)

---

## Code of Conduct

Dengan berpartisipasi dalam project ini, Anda setuju untuk menjaga lingkungan yang ramah dan inklusif. Harap bersikap sopan dan menghormati semua kontributor.

---

## Getting Started

### Prerequisites

- Node.js 14+ installed
- Git installed
- Supabase account
- OpenRouter API key
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork repository**

   ```bash
   # Click "Fork" di GitHub
   ```

2. **Clone fork Anda**

   ```bash
   git clone https://github.com/YOUR_USERNAME/promptcraft.git
   cd promptcraft
   ```

3. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/promptcraft.git
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Setup environment**

   ```bash
   copy .env.example .env.local
   # Edit .env.local dengan credentials Anda
   ```

6. **Run development server**
   ```bash
   npm run dev
   ```

---

## Development Workflow

### 1. Create a Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/amazing-feature
# or
git checkout -b fix/bug-description
```

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `style/` - UI/styling changes
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 2. Make Changes

- Write clean, readable code
- Follow coding standards (see below)
- Add comments for complex logic
- Update documentation if needed
- Test your changes thoroughly

### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Build project
npm run build

# Test locally
npm run dev
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add amazing feature"
```

See [Commit Guidelines](#commit-guidelines) for commit message format.

### 5. Push to Fork

```bash
git push origin feature/amazing-feature
```

### 6. Create Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill in PR template
5. Submit PR

---

## Coding Standards

### JavaScript/React

#### General Rules

- Use ES6+ syntax
- Use functional components with hooks
- Use arrow functions
- Use destructuring where appropriate
- Avoid nested ternaries
- Keep functions small and focused

#### Example

```javascript
// ✅ Good
const MyComponent = ({ user, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await onUpdate(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      {loading ? <Spinner /> : <Form onSubmit={handleSubmit} />}
    </div>
  );
};

// ❌ Bad
function MyComponent(props) {
  var loading = false;

  function handleSubmit(data) {
    loading = true;
    props.onUpdate(data).then(function () {
      loading = false;
    });
  }

  return (
    <div>
      {loading == true ? <Spinner /> : <Form onSubmit={handleSubmit} />}
    </div>
  );
}
```

### CSS/Tailwind

#### Rules

- Use Tailwind utility classes first
- Create custom classes in `globals.css` for reusable patterns
- Follow mobile-first approach
- Use CSS variables for theming
- Keep specificity low

#### Example

```jsx
// ✅ Good
<button className="glass-card hover-scale px-6 py-3 rounded-lg">
  Click me
</button>

// ❌ Bad
<button style={{
  background: 'rgba(255,255,255,0.1)',
  padding: '12px 24px',
  borderRadius: '8px'
}}>
  Click me
</button>
```

### File Organization

```
app/
  feature/
    page.jsx          # Main page component
    layout.jsx        # Layout if needed
    loading.jsx       # Loading state
    error.jsx         # Error boundary

components/
  FeatureName.jsx     # Component file

lib/
  featureName.js      # Utility functions
```

### Naming Conventions

- **Components**: PascalCase (`MyComponent.jsx`)
- **Functions**: camelCase (`handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`)
- **Files**: camelCase (`utils.js`) or PascalCase (`MyComponent.jsx`)
- **CSS Classes**: kebab-case (`glass-card`)

---

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
# Feature
git commit -m "feat(auth): add Google OAuth integration"

# Bug fix
git commit -m "fix(navbar): resolve mobile menu closing issue"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Refactor
git commit -m "refactor(hooks): simplify useDebounce implementation"

# Multiple changes
git commit -m "feat(marketplace): add template filtering

- Add category filter
- Add search functionality
- Add sorting options

Closes #123"
```

---

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors
- [ ] Tested on multiple browsers
- [ ] Tested on mobile devices
- [ ] Build succeeds (`npm run build`)

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How to Test

1. Step 1
2. Step 2
3. Expected result

## Screenshots (if applicable)

Add screenshots here

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-reviewed
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tested thoroughly
```

### Review Process

1. Maintainer reviews code
2. Automated tests run
3. Feedback provided (if needed)
4. Changes requested (if needed)
5. Approved and merged

---

## Bug Reports

### Before Reporting

- Search existing issues
- Try latest version
- Collect error messages
- Prepare reproduction steps

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**

1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**

- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 2.0.0]

**Additional context**
Any other information
```

---

## Feature Requests

### Before Requesting

- Search existing requests
- Check roadmap
- Consider if it fits project scope

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of desired solution

**Describe alternatives you've considered**
Alternative solutions

**Additional context**
Mockups, examples, etc.
```

---

## Development Tips

### Useful Commands

```bash
# Check code style
npm run lint

# Build for production
npm run build

# Start production server
npm run start

# Clear cache
rm -rf .next
```

### Debugging

```javascript
// Use console.log sparingly
console.log("Debug:", variable);

// Use debugger
debugger;

// Use React DevTools
// Install browser extension
```

### Testing Locally

1. Test in development mode
2. Test production build
3. Test on different browsers
4. Test on mobile devices
5. Test with slow network
6. Test with disabled JavaScript

---

## Questions?

- 📧 Email: dev@promptcraft.app
- 💬 Discord: https://discord.gg/promptcraft
- 📖 Docs: [README.md](README.md)

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

<div align="center">

**Thank you for contributing to PromptCraft! 🎉**

_Every contribution, no matter how small, is appreciated!_

</div>
