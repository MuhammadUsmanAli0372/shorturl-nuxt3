<template>
  <div class="pt-[200px]">
  </div>
</template>

<script lang="ts" setup>
import { Database } from "~~/types/supabase";
// import geoip from "geoip-lite";

const params = useRoute().params;

const client = useSupabaseAuthClient<Database>();

// Get the params id
if (!params.id) {
  throw createError({
    statusCode: 404,
    message: "Not Found",
  });
}

// Fetch the data from supabase
const { data } = useAsyncData("links", async () => {
  const { data, error } = await client
    .from("links")
    .select("*")
    .eq("key", params.id)
    .single();

  if (error) {
    throw createError({
      statusCode: 404,
      message: "Not Found",
    });
  }

  return data;
});

if (data.value?.long_url) {
  const ua = useUserAgent();

//   console.log({ ua });

//   if (ua && ua.ip) {
//       const geolocation = geoip.lookup(ua.ip);
//   }

    const { data:res, error } = await client.from('clicks').insert({
        link_id: data.value.id,
        ip: ua?.ip,
        // country: geolocation?.country,
        // city: geolocation?.city,
        user_agent: ua?.userAgent
    });

  useExternalRedirect(data.value.long_url);
}
</script>
