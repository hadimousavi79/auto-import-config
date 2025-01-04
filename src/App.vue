<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue'
import DialogSchema from './components/DialogSchema.vue'

const form = ref({ link: '', app: 'v2rayng' })
const error = ref('')
const generatedSchema = ref<string>('')
const showDialog = ref(false)

const generateUrlSchema = () => {
  if (!form.value.link) {
    return (error.value = 'Please fill input correctly')
  }

  error.value = ''
  const generatedUrl = form.value.link.split('?')[0]
  if (form.value.app === 'v2rayng') {
    generatedSchema.value = `v2rayng://install-sub?url=${encodeURIComponent(`${generatedUrl}?custom=2#DemonAccess`)}&name=DemonAccess`
    showDialog.value = true
  } else if (form.value.app === 'streisand') {
    generatedSchema.value = `streisand://import/${generatedUrl}?custom=2&amp;#DemonAccess`
    showDialog.value = true
  }
}
</script>

<template>
  <div class="flex items-center justify-center w-full h-screen">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl"> Demon access </CardTitle>
        <CardDescription> auto import config </CardDescription>
        <Alert v-if="error" variant="destructive">
          <AlertCircle class="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {{ error }}
          </AlertDescription>
        </Alert>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="subscription link">Subscription link</Label>
          <Input v-model="form.link" id="subscription link" type="string" required />
        </div>
        <div class="grid gap-2">
          <Label for="app">App </Label>
          <Select id="app" v-model="form.app" required>
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="v2rayng"> V2rayNG </SelectItem>
                <SelectItem value="streisand"> Streisand </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button @click="generateUrlSchema" class="w-full"> Generate </Button>
      </CardFooter>
    </Card>
    <DialogSchema v-model:show="showDialog" :url="generatedSchema" />
  </div>
</template>
