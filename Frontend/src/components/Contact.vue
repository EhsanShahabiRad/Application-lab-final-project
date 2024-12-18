<template>
  <h2 class="underlined">Contact With Me</h2>
  <div class="contact-grid">
    <div class="contact-item">
      <p>
        <strong>Email:</strong>
        <a href="mailto:yEmail@Gmail.com">Email@Gmail.com</a>
      </p>
    </div>
    <div class="contact-item">
      <p>
        <strong>LinkedIn:</strong>
        <a href="https://linkedin.com" target="_blank">linkedin.com</a>
      </p>
    </div>
    <div class="contact-item">
      <p>
        <strong>GitHub:</strong>
        <a href="https://github.com" target="_blank">github.com</a>
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.contact {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  width: 90%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.contact-item p {
  margin: 0;
  line-height: 1.6;
}

.contact-item strong {
  font-weight: bold;
}

.contact-item a {
  color: #af874c;
  text-decoration: none;
  font-weight: bold;
}

.contact-item a:hover {
  text-decoration: underline;
}

@media (min-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
}
</style>
