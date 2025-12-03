# Toast Notification System

## Overview
Build a complete toast notification system that can be triggered from anywhere in your application. You'll build this incrementally, starting with a basic implementation and then refactoring to use React Context.

## Phase 1: Basic Toast System (No Context)

Build a toast notification system with the following features:

### Core Requirements
- [ ] `<ToastContainer>` component that renders toasts at a fixed position
- [ ] `addToast()` function that can be called to create new toasts
- [ ] Toast types: `success`, `error`, `info`, `warning`
- [ ] Each toast shows: message, type indicator (icon/color), close button
- [ ] Auto-dismiss after configurable duration (default: 5000ms)
- [ ] Manual dismiss via close button (X icon)
- [ ] Multiple toasts stack vertically
- [ ] Smooth enter/exit animations

### Toast Properties
```typescript
interface Toast {
  id: string;           // Unique identifier
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;    // Optional, defaults to 5000ms
}
```

### Initial Implementation Strategy
Start with a simple approach where:
- `ToastContainer` manages toast state internally with `useState`
- Export a way to trigger toasts (you'll need to figure this out!)
- Place `ToastContainer` at the top level of your app

### Demo Buttons
Create a demo UI with buttons to test each toast type:
```
[Success Toast] [Error Toast] [Info Toast] [Warning Toast]
```

### Styling Requirements
- Position: Fixed to top-right corner (or your choice)
- Width: ~300-400px
- Stacking: New toasts appear at top, push others down
- Colors:
  - Success: Green background
  - Error: Red background  
  - Info: Blue background
  - Warning: Orange/Yellow background
- Animations: Slide in from right, fade out on dismiss

### Technical Constraints
- React + TypeScript (optional but recommended)
- Tailwind CSS for styling
- No external toast libraries (build from scratch)
- Use `setTimeout` for auto-dismiss
- Generate unique IDs (use `crypto.randomUUID()` or timestamp)

---

## Phase 2: Refactor to React Context

**STOP!** Complete Phase 1 fully before reading this section.

Once Phase 1 is working, you'll refactor to use React Context:

### Why Context?
The problem with Phase 1: How do you trigger toasts from deeply nested components without prop drilling?

### Refactoring Requirements
- [ ] Create `ToastProvider` component that wraps your app
- [ ] Create `useToast()` custom hook to access toast functions
- [ ] Move toast state management into the provider
- [ ] Allow any component to call `addToast()` via the hook
- [ ] `ToastContainer` should remain as a presentation component

### New Architecture
```jsx
// App structure
<ToastProvider>
  <App>
    <SomeDeepComponent>
      <AnotherComponent>
        {/* Can call addToast() from here! */}
      </AnotherComponent>
    </SomeDeepComponent>
  </App>
</ToastProvider>

// Usage in any component
function MyComponent() {
  const { addToast } = useToast();
  
  const handleClick = () => {
    addToast({
      type: 'success',
      message: 'Profile updated successfully!'
    });
  };
  
  return <button onClick={handleClick}>Update</button>;
}
```

### Context API Structure
```typescript
interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}
```

### Refactoring Steps
1. Create `ToastContext` and `ToastProvider`
2. Move state from `ToastContainer` to `ToastProvider`
3. Create `useToast()` hook that uses `useContext`
4. Update demo buttons to use `useToast()` hook
5. Verify everything still works

---

## Phase 3: Advanced Features (Optional)

If you finish early or want extra challenges:

- [ ] **Toast queue limit** - Max 3-5 toasts visible at once
- [ ] **Pause on hover** - Hovering pauses auto-dismiss timer
- [ ] **Progress bar** - Visual indicator of remaining time
- [ ] **Action buttons** - Add optional action button to toasts
- [ ] **Position prop** - Allow `top-left`, `top-right`, `bottom-left`, `bottom-right`
- [ ] **Keyboard dismiss** - Press Escape to dismiss all toasts
- [ ] **Sound effects** - Play subtle sound on error/success (optional)
- [ ] **Accessibility** - Proper ARIA labels, focus management

---

## Success Criteria

### Phase 1 Complete When:
- ✅ Can trigger all 4 toast types from demo buttons
- ✅ Toasts auto-dismiss after 5 seconds
- ✅ Manual dismiss works via X button
- ✅ Multiple toasts stack properly
- ✅ Smooth animations on enter/exit
- ✅ No memory leaks (timers cleaned up)

### Phase 2 Complete When:
- ✅ Toast state managed in Context Provider
- ✅ `useToast()` hook works from any component
- ✅ Demo buttons use the hook (not direct function calls)
- ✅ All Phase 1 functionality still works
- ✅ Clean separation: Provider (logic) vs Container (presentation)

---

## Common Pitfalls

**Phase 1:**
- Forgetting to clear timeouts when toast is manually dismissed
- Not generating unique IDs for each toast
- Z-index issues with positioning
- Memory leaks from orphaned timers

**Phase 2:**
- Forgetting to wrap app with `ToastProvider`
- Context value not memoized (causes unnecessary re-renders)
- Trying to use `useToast()` outside of provider (will crash)
- Not cleaning up timers when moving to Context

---

## Testing Checklist

- [ ] Rapid-fire multiple toasts (should stack properly)
- [ ] Dismiss one toast while others remain
- [ ] Auto-dismiss works after exact duration
- [ ] Manual dismiss clears the auto-dismiss timer
- [ ] No console errors or warnings
- [ ] Works from deeply nested components (Phase 2)
- [ ] Context provider error if hook used outside provider (Phase 2)

---

## Interview Tips

**What interviewers look for:**
- Clean component structure and separation of concerns
- Proper cleanup of side effects (timers)
- Understanding of when Context is appropriate
- State management decisions (local vs global)
- Animation handling
- Edge case handling

**Be ready to discuss:**
- Why Context is better than alternatives (prop drilling, global variables)
- How you generate unique IDs
- Timer cleanup strategy
- Alternative approaches (Zustand, Redux, event emitters)
- Production considerations (toast queue limits, accessibility)

---

## Time Expectations

- **Phase 1**: 30-45 minutes
- **Phase 2 Refactor**: 15-20 minutes
- **Total**: ~45-60 minutes for core functionality

Good luck! Remember: Build Phase 1 completely before even thinking about Context.
