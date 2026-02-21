# Contributing to FleetFlow 🚀

Thank you for your interest in contributing to FleetFlow! We welcome contributions from the community and are grateful for your support.

## 📋 Table of Contents
- [How to Contribute](#how-to-contribute)
- [Contribution Process](#contribution-process)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Message Convention](#commit-message-convention)
- [Areas for Contribution](#areas-for-contribution)
- [Development Setup](#development-setup)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)

## How to Contribute

We welcome contributions to FleetFlow! Here's how you can help:

### Contribution Process

1. **Fork the Repository**
   ```bash
   # Click 'Fork' on GitHub
   git clone https://github.com/YOUR-USERNAME/FleetFlow-TeamCIT.git
   cd FleetFlow-TeamCIT
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Write clean, documented code
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   # Backend tests
   cd backend
   pytest
   
   # Frontend tests
   cd Frontend
   npm run lint
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Describe your changes
   - Link any related issues

## Code Style Guidelines

### Python (Backend)
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions
- Maximum line length: 100 characters
- Use meaningful variable names
- Keep functions small and focused

**Example:**
```python
def calculate_trip_distance(start_odometer: float, end_odometer: float) -> float:
    """
    Calculate the distance traveled during a trip.
    
    Args:
        start_odometer: Starting odometer reading in kilometers
        end_odometer: Ending odometer reading in kilometers
        
    Returns:
        Distance traveled in kilometers
        
    Raises:
        ValueError: If end_odometer is less than start_odometer
    """
    if end_odometer < start_odometer:
        raise ValueError("End odometer cannot be less than start odometer")
    return end_odometer - start_odometer
```

### JavaScript/React (Frontend)
- Use functional components with hooks
- Use meaningful variable names
- Keep components small and focused
- Use Tailwind CSS for styling
- Prefer const over let
- Use destructuring when appropriate

**Example:**
```jsx
import { useState, useEffect } from 'react';

function VehicleCard({ vehicle }) {
  const { id, vehicle_code, status, manufacturer, model } = vehicle;
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold">{vehicle_code}</h3>
      <p className="text-gray-600">{manufacturer} {model}</p>
      <span className="badge">{status}</span>
    </div>
  );
}

export default VehicleCard;
```

## Commit Message Convention

We follow conventional commits for clear and consistent commit history:

- `feat:` New feature
  - Example: `feat: add vehicle fuel efficiency tracking`
- `fix:` Bug fix
  - Example: `fix: resolve trip odometer calculation error`
- `docs:` Documentation changes
  - Example: `docs: update API endpoint documentation`
- `style:` Code style changes (formatting, missing semicolons, etc.)
  - Example: `style: format code with black`
- `refactor:` Code refactoring (no functional changes)
  - Example: `refactor: simplify driver status validation logic`
- `test:` Adding or updating tests
  - Example: `test: add unit tests for expense calculations`
- `chore:` Maintenance tasks, dependency updates
  - Example: `chore: update dependencies to latest versions`
- `perf:` Performance improvements
  - Example: `perf: optimize database query for trip reports`

**Commit Message Format:**
```
<type>: <short description>

[optional body]

[optional footer]
```

**Good Examples:**
```bash
git commit -m "feat: add real-time GPS tracking for vehicles"
git commit -m "fix: correct maintenance cost calculation in reports"
git commit -m "docs: add troubleshooting section to README"
```

## Areas for Contribution

We welcome contributions in the following areas:

### 🐛 Bug Fixes
- Report bugs via [GitHub Issues](https://github.com/yourusername/FleetFlow-TeamCIT/issues)
- Fix existing bugs
- Improve error handling

### ✨ New Features
- Real-time GPS tracking
- Mobile application
- Advanced reporting
- Integration with third-party services
- Route optimization

### 📚 Documentation Improvements
- API documentation
- User guides
- Code comments
- Tutorial videos
- Architecture diagrams

### 🎨 UI/UX Enhancements
- Improve existing interfaces
- Add accessibility features
- Mobile responsiveness
- Dark mode support
- Better data visualization

### ⚡ Performance Optimizations
- Database query optimization
- Frontend rendering improvements
- Caching strategies
- API response time improvements

### 🧪 Test Coverage Improvements
- Unit tests
- Integration tests
- End-to-end tests
- Performance tests

## Development Setup

Please refer to the [README.md](README.md) for detailed setup instructions.

**Quick Setup:**
```bash
# Clone and setup
git clone https://github.com/yourusername/FleetFlow-TeamCIT.git
cd FleetFlow-TeamCIT

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your database credentials
uvicorn app.main:app --reload

# Frontend (in a new terminal)
cd Frontend
npm install
npm run dev
```

## Testing

### Backend Tests
```bash
cd backend
pytest                          # Run all tests
pytest tests/test_trips.py      # Run specific test file
pytest --cov=app tests/         # Run with coverage
```

### Frontend Tests
```bash
cd Frontend
npm run lint                    # Lint code
npm run lint -- --fix           # Fix linting issues
npm run build                   # Test production build
```

### Manual Testing
1. Start both backend and frontend servers
2. Test all affected endpoints/pages
3. Verify no console errors
4. Check responsive design
5. Test edge cases

## Pull Request Process

1. **Update Documentation**
   - Update README.md if adding new features
   - Add/update API documentation
   - Update CHANGELOG.md if applicable

2. **Ensure Tests Pass**
   - All existing tests must pass
   - Add tests for new features
   - Ensure no linting errors

3. **Provide Clear Description**
   - What changes were made
   - Why the changes were needed
   - How to test the changes
   - Screenshots (if UI changes)

4. **Link Related Issues**
   - Reference issue numbers (e.g., "Fixes #123")
   - Close issues when appropriate

5. **Request Review**
   - Request review from maintainers
   - Address feedback promptly
   - Keep the PR focused and small

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
How has this been tested?

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
```

## Code Review Process

- All submissions require review from at least one maintainer
- Maintainers may request changes or improvements
- Once approved, a maintainer will merge your PR
- PRs will be merged using "Squash and Merge" to maintain clean history

## Questions?

- 💬 **Discord**: [Join our community](#)
- 📧 **Email**: support@fleetflow.com
- 📝 **Issues**: [GitHub Issues](https://github.com/yourusername/FleetFlow-TeamCIT/issues)

---

**Thank you for contributing to FleetFlow!** 🎉

*Together, we're building better fleet management solutions.*
