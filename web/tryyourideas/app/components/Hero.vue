<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-title">
        <slot name="title">Build Something Amazing</slot>
      </h1>
      <p class="hero-subtitle">
        <slot name="subtitle">Turn your ideas into reality with modern web technologies</slot>
      </p>
      <div class="hero-actions">
        <slot name="actions">
          <a href="#features" class="btn btn-primary">Get Started</a>
          <a href="/about" class="btn btn-secondary">Learn More</a>
        </slot>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero-content {
  max-width: 800px;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  opacity: 0.9;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.875rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background: white;
  color: #667eea;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
