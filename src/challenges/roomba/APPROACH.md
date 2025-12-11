# Approach

Some notes on approaching this problem.

```typescript
interface RoombaState {
  x: number;        // 0-9 (column)
  y: number;        // 0-9 (row)
  direction: 0 | 90 | 180 | 270;  // 0=North, 90=East, 180=South, 270=West
}
```

---

## Core Logic

### Movement Deltas
```
North (0°):   dx: 0,  dy: -1
East (90°):   dx: 1,  dy: 0
South (180°): dx: 0,  dy: 1
West (270°):  dx: -1, dy: 0
```

### Turn Right
```javascript
newDirection = (currentDirection + 90) % 360
```

### Move Forward
```javascript
1. Calculate next position using direction delta
2. Check if next position is within bounds (0-9 for both x and y)
3. If valid: update position
4. If invalid (wall): turn right instead
```

---

## Test Scenarios

### Basic Movement
- Start: (5, 5) facing North → Move → Result: (5, 4) facing North ✅

### Wall Collision
- Start: (5, 0) facing North → Move → Result: (5, 0) facing East ✅

### Corner Behavior
- Start: (9, 0) facing North → Move → (9, 0) facing East
- Move again → (9, 0) facing South (correct!) ✅

### Full Rotation
- Start: (0, 0) facing North
- Turn Right 4 times → Back to North ✅

---

## Testing Checklist

**Basic Functionality**
- [ ] Move Forward works in all 4 directions
- [ ] Turn Right rotates visually and in state
- [ ] Roomba starts at defined position

**Boundary Testing**
- [ ] Top edge (y=0): North collision turns right
- [ ] Right edge (x=9): East collision turns right
- [ ] Bottom edge (y=9): South collision turns right
- [ ] Left edge (x=0): West collision turns right

**Corners**
- [ ] All 4 corners handle double-wall collisions correctly

---

## Success Criteria

**Must Have:**
- ✅ 10x10 grid rendered
- ✅ Roomba with direction indicator
- ✅ Both controls functional
- ✅ Wall collision turns right
- ✅ All edge cases handled

**Nice to Have:**
- ✅ Smooth animations
- ✅ Position/direction display
- ✅ Clean UI

---

## Bonus Features (Optional)

- [ ] Keyboard controls (arrow keys)
- [ ] Click cell to move Roomba there
- [ ] Obstacles inside grid
- [ ] Auto-pilot mode
- [ ] Path tracking / visited cells

---

## Interview Tips

**Time Management (75 min)**
- 0-10 min: Plan approach
- 10-30 min: Grid + Roomba rendering
- 30-50 min: Movement logic + collision
- 50-65 min: Test edge cases
- 65-75 min: Polish

**What They're Looking For:**
- Problem decomposition
- Edge case awareness
- Clean, readable code
- Communication throughout
- Testing mindset

**If You Get Stuck:**
- Test one direction at a time
- Draw coordinate system on paper
- Start with hardcoded values
- Ask clarifying questions
