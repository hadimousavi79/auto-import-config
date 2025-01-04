<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDeviceDetection } from '@/composables/useDeviceDetection'

const route = useRoute()

const { isAndroid, isIOS } = useDeviceDetection()

const url = computed(() => {
  if (!route.query.url) return null
  const generatedUrl = (route.query.url as string).split('?')[0]
  if (!isAndroid()) {
    return `v2rayng://install-sub?url=${encodeURIComponent(`${generatedUrl}?custom=2#DemonAccess`)}&name=DemonAccess`
  } else if (isIOS()) {
    return `streisand://import/${generatedUrl}?custom=2&amp;#DemonAccess`
  }
  return null
})
</script>

<template>
  <div class="flex items-center justify-center w-full h-screen">
    <Card v-if="route.query.url" class="w-full max-w-sm">
      <CardHeader>
        <!-- {{ route.query.url }} -->
        <CardTitle class="text-2xl"> Deamon access </CardTitle>
        <CardDescription> auto import config </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <Alert v-if="!isAndroid() && !isIOS()" variant="destructive">
          <AlertCircle class="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription> Please use android or IOS </AlertDescription>
        </Alert>
        <div v-else>
          <a :href="url!">
            <Button class="w-full">واردسازی خودکار</Button>
          </a>
        </div>
      </CardContent>
    </Card>
    <Card v-else>
      <Alert variant="destructive">
        <AlertCircle class="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription> please add url with this format: domain/?url=yourUrl </AlertDescription>
      </Alert>
    </Card>
  </div>
</template>
