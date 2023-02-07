<template>
    <section class="h-screen grid place-content-center">
        <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-5xl font-bold heading">
                Make your link tiny and easy to share with tynl
            </h1>
            <p class="my-10 text-lg w-10/12 md:w-2/3 mx-auto">
                Transform your long, cumbersome URLs into short and. shareable links with TinyLink
            </p>

            <NuxtLink
                class="btn btn-primay"
                :to="{ name: 'dashboard' }"
            >
                Short Now!
            </NuxtLink>

        </div>
    </section>
</template>

<style>
.heading {
  line-height: 110%;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0) 188.28%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
</style>