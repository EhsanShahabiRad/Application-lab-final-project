<template>
  <div class="about-grid" id="about">
    <div class="about-text">
      <h2 class="underlined">About Me</h2>
      <p>
        Hello! I am a passionate web developer with experience in creating
        simple, clean, and effective web pages. I love learning new technologies
        and building projects that make a difference.
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  align-items: center;
}

.about-text {
  line-height: 1.6;
  text-align: left;
}

.underlined {
  text-decoration: underline;
  text-underline-offset: 10px;
  text-decoration-thickness: 2px;
  text-decoration-color: #6a11cb;
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
