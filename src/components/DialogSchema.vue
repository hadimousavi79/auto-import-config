<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Check } from 'lucide-vue-next'

defineProps<{
  url: string
}>()
const { copy, copied } = useClipboard()
const showDialog = defineModel<boolean>('show', { default: false, required: true })
</script>

<template>
  <Dialog v-model:open="showDialog">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Schema link</DialogTitle>
        <DialogDescription>Copy schema url and share</DialogDescription>
        {{ url }}
      </DialogHeader>
      <div class="flex items-center space-x-2">
        <div class="grid flex-1 gap-2" :key="url">
          <Label for="schema" class="sr-only"> Schema </Label>
          <input
            class="flex w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background"
            id="schema"
            :value="url"
            type="text"
            readonly
          />
        </div>
        <Button @click="copy(url)" size="sm" class="px-3">
          <span class="sr-only">Copy</span>
          <Check v-if="copied" class="w-4 h-4" />
          <Copy v-else class="w-4 h-4" />
        </Button>
      </div>
      <DialogFooter class="sm:justify-start">
        <DialogClose as-child>
          <Button type="button" variant="secondary"> Close </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
