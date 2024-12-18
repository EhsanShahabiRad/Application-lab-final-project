<template>
  <div class="projects" id="projects">
    <h2 class="underlined">Projects</h2>
    <div class="project">
      <p class="project-title">Project 1: Portfolio Website</p>
      <p>
        A simple personal portfolio to showcase my work and skills.
        <a href="#">View Project</a>
      </p>
    </div>
    <div class="project">
      <p class="project-title">Project 2: To-Do List App</p>
      <p>
        An interactive to-do list to help manage daily tasks.
        <a href="#">View Project</a>
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.projects {
  margin-top: 20px;
}

.underlined {
  text-decoration: underline;
  text-underline-offset: 10px;
  text-decoration-thickness: 2px;
  text-decoration-color: #6a11cb;
}

.project {
  margin-bottom: 20px;
}

.project-title {
  font-weight: 700;
  margin: 0 0 10px;
}

.project a {
  color: #af874c;
  text-decoration: none;
  font-weight: bold;
}

.project a:hover {
  text-decoration: underline;
}

</style>
