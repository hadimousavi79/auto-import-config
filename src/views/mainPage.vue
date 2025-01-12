<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
//@ts-expect-error  // ignore this line
import { useDevice } from 'next-vue-device-detector'

const route = useRoute()

const d = useDevice()

const url = computed(() => {
  if (!route.query.url) return null
  const generatedUrl = (route.query.url as string).split('?')[0]
  if (d.mobile && d.android) {
    return `v2rayng://install-config?url=${encodeURIComponent(generatedUrl + '?custom=2#DeamonAccess')}`
  } else if (d.mobile && d.ios) {
    return `streisand://import/${generatedUrl}?custom=2&amp;#DeamonAccess`
  }
  return null
})
</script>

<template>
  <div class="flex items-center justify-center w-full h-screen">
    <Card v-if="route.query.url" class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl"> Deamon access </CardTitle>
      </CardHeader>
      <CardContent class="grid gap-4">
        <Alert v-if="!d.mobile" variant="destructive">
          <AlertCircle class="w-4 h-4" />
          <AlertTitle style="direction: rtl">توجه</AlertTitle>
          <AlertDescription class="text-right" style="direction: rtl">
            لطفا در گوشی یا تبلت این صفحه را باز کنید
          </AlertDescription>
        </Alert>
        <div v-else>
          <Alert class="mb-5" variant="info">
            <AlertCircle class="w-4 h-4" />
            <AlertTitle style="direction: rtl">توجه</AlertTitle>
            <AlertDescription class="text-right" style="direction: rtl">
              لطفا <span class="font-bold">فقط</span> به کانفیگ های دارای پرچم متصل
              بشوید</AlertDescription
            >
          </Alert>
          <Alert class="mb-5" variant="warning">
            <AlertCircle class="w-4 h-4" />
            <AlertTitle style="direction: rtl">توجه</AlertTitle>
            <AlertDescription class="text-right" style="direction: rtl">
              در اندروید از v2rayng
              <br />
              در IOS آیفون از streisand استفاده کنید
            </AlertDescription>
          </Alert>
          <Alert class="mb-5" variant="destructive">
            <AlertCircle class="w-4 h-4" />
            <AlertTitle style="direction: rtl">توجه</AlertTitle>
            <AlertDescription class="text-right" style="direction: rtl">
              در صورتی که بعد از زدن دکمه ی زیر کانفیگ هارا مشاهده نکردید لطفا در برنامه گزینه ی
              بروزرسانی اشتراک (update current group subscription) را بزنید
            </AlertDescription>
          </Alert>

          <a class="mt-5" :href="url!">
            <Button class="w-full">واردسازی خودکار </Button>
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
