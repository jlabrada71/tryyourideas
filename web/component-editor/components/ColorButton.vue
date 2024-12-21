<template>
  <div class="flex flex-col">
    <div>
      <RangeButton 
        :option="currentColor.opacity"
        :options="opacityValues"
        @update:option="selectOpacity"
      >
        Opacity {{ currentColor.opacity }}%
      </RangeButton></div>
    <div >Other color values</div>
    <div class="flex h-6">
      <div class="w-36 h-6 cursor-pointer  bg-white text-black border-black border-2" @click="select('transparent')">Transparent</div>
      <div class="w-36 h-6  cursor-pointer bg-white text-black border-black border-2" @click="select('unset')">unset</div>
    </div>
    <div class="flex justify-center h-6"> 
      <div class="w-36 h-6 cursor-pointer  bg-black text-white border-black border-2" @click="select('current')">Current</div>
      <div class="w-36 h-6 cursor-pointer bg-inherit text-inherit border-black border-2" @click="select('inherit')">Inherit</div>
    </div>
    <div class="flex h-6"> 
      <div class="w-36 h-6 cursor-pointer  bg-black text-white border-black border-2" @click="select('black')">Black</div>
      <div class="w-36 h-6  cursor-pointer bg-transparent text-black border-black border-2" @click="select('white')">White</div>
    </div>
    <div class="w-40 mt-2">Colors</div>
    <div class="flex h-5"> <div class="w-40">slate</div>
    <div class="w-8 h-4 cursor-pointer  bg-slate-50 text-slate-50 border-slate-50 divide-slate-50 ring-slate-50 outline-slate-50" @click="select('slate-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-slate-100 text-slate-100 border-slate-100 divide-slate-100 ring-slate-100 outline-slate-100" @click="select('slate-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-slate-200 text-slate-200 border-slate-200 divide-slate-200 ring-slate-200 outline-slate-200" @click="select('slate-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-slate-300 text-slate-300 border-slate-300 divide-slate-300 ring-slate-300 outline-slate-300" @click="select('slate-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-slate-400 text-slate-400 border-slate-400 divide-slate-400 ring-slate-400 outline-slate-400" @click="select('slate-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-slate-500 text-slate-500 border-slate-500 divide-slate-500 ring-slate-500 outline-slate-500" @click="select('slate-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-slate-600 text-slate-600 border-slate-600 divide-slate-600 ring-slate-600 outline-slate-600" @click="select('slate-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-slate-700 text-slate-700 border-slate-700 divide-slate-700 ring-slate-700 outline-slate-700" @click="select('slate-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-slate-800 text-slate-800 border-slate-800 divide-slate-800 ring-slate-800 outline-slate-800" @click="select('slate-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-slate-900 text-slate-900 border-slate-900 divide-slate-900 ring-slate-900 outline-slate-900" @click="select('slate-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">gray</div>
    <div class="w-8 h-4 cursor-pointer  bg-gray-50 text-gray-50 border-gray-50 divide-gray-50 ring-gray-50 outline-gray-50" @click="select('gray-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-gray-100 text-gray-100 border-gray-100 divide-gray-100 ring-gray-100 outline-gray-100" @click="select('gray-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-gray-200 text-gray-200 border-gray-200 divide-gray-200 ring-gray-200 outline-gray-200" @click="select('gray-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-gray-300 text-gray-300 border-gray-300 divide-gray-300 ring-gray-300 outline-gray-300" @click="select('gray-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-gray-400 text-gray-400 border-gray-400 divide-gray-400 ring-gray-400 outline-gray-400" @click="select('gray-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-gray-500 text-gray-500 border-gray-500 divide-gray-500 ring-gray-500 outline-gray-500" @click="select('gray-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-gray-600 text-gray-600 border-gray-600 divide-gray-600 ring-gray-600 outline-gray-600" @click="select('gray-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-gray-700 text-gray-700 border-gray-700 divide-gray-700 ring-gray-700 outline-gray-700" @click="select('gray-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-gray-800 text-gray-800 border-gray-800 divide-gray-800 ring-gray-800 outline-gray-800" @click="select('gray-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-gray-900 text-gray-900 border-gray-900 divide-gray-900 ring-gray-900 outline-gray-900" @click="select('gray-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">zinc</div>
    <div class="w-8 h-4 cursor-pointer  bg-zinc-50 text-zinc-50 border-zinc-50 divide-zinc-50 ring-zinc-50 outline-zinc-50" @click="select('zinc-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-zinc-100 text-zinc-100 border-zinc-100 divide-zinc-100 ring-zinc-100 outline-zinc-100" @click="select('zinc-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-zinc-200 text-zinc-200 border-zinc-200 divide-zinc-200 ring-zinc-200 outline-zinc-200" @click="select('zinc-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-zinc-300 text-zinc-300 border-zinc-300 divide-zinc-300 ring-zinc-300 outline-zinc-300" @click="select('zinc-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-zinc-400 text-zinc-400 border-zinc-400 divide-zinc-400 ring-zinc-400 outline-zinc-400" @click="select('zinc-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-zinc-500 text-zinc-500 border-zinc-500 divide-zinc-500 ring-zinc-500 outline-zinc-500" @click="select('zinc-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-zinc-600 text-zinc-600 border-zinc-600 divide-zinc-600 ring-zinc-600 outline-zinc-600" @click="select('zinc-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-zinc-700 text-zinc-700 border-zinc-700 divide-zinc-700 ring-zinc-700 outline-zinc-700" @click="select('zinc-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-zinc-800 text-zinc-800 border-zinc-800 divide-zinc-800 ring-zinc-800 outline-zinc-800" @click="select('zinc-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-zinc-900 text-zinc-900 border-zinc-900 divide-zinc-900 ring-zinc-900 outline-zinc-900" @click="select('zinc-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">neutral</div>
    <div class="w-8 h-4 cursor-pointer  bg-neutral-50 text-neutral-50 border-neutral-50 divide-neutral-50 ring-neutral-50 outline-neutral-50" @click="select('neutral-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-neutral-100 text-neutral-100 border-neutral-100 divide-neutral-100 ring-neutral-100 outline-neutral-100" @click="select('neutral-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-neutral-200 text-neutral-200 border-neutral-200 divide-neutral-200 ring-neutral-200 outline-neutral-200" @click="select('neutral-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-neutral-300 text-neutral-300 border-neutral-300 divide-neutral-300 ring-neutral-300 outline-neutral-300" @click="select('neutral-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-neutral-400 text-neutral-400 border-neutral-400 divide-neutral-400 ring-neutral-400 outline-neutral-400" @click="select('neutral-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-neutral-500 text-neutral-500 border-neutral-500 divide-neutral-500 ring-neutral-500 outline-neutral-500" @click="select('neutral-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-neutral-600 text-neutral-600 border-neutral-600 divide-neutral-600 ring-neutral-600 outline-neutral-600" @click="select('neutral-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-neutral-700 text-neutral-700 border-neutral-700 divide-neutral-700 ring-neutral-700 outline-neutral-700" @click="select('neutral-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-neutral-800 text-neutral-800 border-neutral-800 divide-neutral-800 ring-neutral-800 outline-neutral-800" @click="select('neutral-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-neutral-900 text-neutral-900 border-neutral-900 divide-neutral-900 ring-neutral-900 outline-neutral-900" @click="select('neutral-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">stone</div>
    <div class="w-8 h-4 cursor-pointer  bg-stone-50 text-stone-50 border-stone-50 divide-stone-50 ring-stone-50 outline-stone-50" @click="select('stone-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-stone-100 text-stone-100 border-stone-100 divide-stone-100 ring-stone-100 outline-stone-100" @click="select('stone-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-stone-200 text-stone-200 border-stone-200 divide-stone-200 ring-stone-200 outline-stone-200" @click="select('stone-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-stone-300 text-stone-300 border-stone-300 divide-stone-300 ring-stone-300 outline-stone-300" @click="select('stone-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-stone-400 text-stone-400 border-stone-400 divide-stone-400 ring-stone-400 outline-stone-400" @click="select('stone-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-stone-500 text-stone-500 border-stone-500 divide-stone-500 ring-stone-500 outline-stone-500" @click="select('stone-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-stone-600 text-stone-600 border-stone-600 divide-stone-600 ring-stone-600 outline-stone-600" @click="select('stone-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-stone-700 text-stone-700 border-stone-700 divide-stone-700 ring-stone-700 outline-stone-700" @click="select('stone-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-stone-800 text-stone-800 border-stone-800 divide-stone-800 ring-stone-800 outline-stone-800" @click="select('stone-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-stone-900 text-stone-900 border-stone-900 divide-stone-900 ring-stone-900 outline-stone-900" @click="select('stone-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">red</div>
    <div class="w-8 h-4 cursor-pointer  bg-red-50 text-red-50 border-red-50 divide-red-50 ring-red-50 outline-red-50" @click="select('red-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-red-100 text-red-100 border-red-100 divide-red-100 ring-red-100 outline-red-100" @click="select('red-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-red-200 text-red-200 border-red-200 divide-red-200 ring-red-200 outline-red-200" @click="select('red-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-red-300 text-red-300 border-red-300 divide-red-300 ring-red-300 outline-red-300" @click="select('red-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-red-400 text-red-400 border-red-400 divide-red-400 ring-red-400 outline-red-400" @click="select('red-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-red-500 text-red-500 border-red-500 divide-red-500 ring-red-500 outline-red-500" @click="select('red-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-red-600 text-red-600 border-red-600 divide-red-600 ring-red-600 outline-red-600" @click="select('red-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-red-700 text-red-700 border-red-700 divide-red-700 ring-red-700 outline-red-700" @click="select('red-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-red-800 text-red-800 border-red-800 divide-red-800 ring-red-800 outline-red-800" @click="select('red-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-red-900 text-red-900 border-red-900 divide-red-900 ring-red-900 outline-red-900" @click="select('red-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">orange</div>
    <div class="w-8 h-4 cursor-pointer  bg-orange-50 text-orange-50 border-orange-50 divide-orange-50 ring-orange-50 outline-orange-50" @click="select('orange-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-orange-100 text-orange-100 border-orange-100 divide-orange-100 ring-orange-100 outline-orange-100" @click="select('orange-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-orange-200 text-orange-200 border-orange-200 divide-orange-200 ring-orange-200 outline-orange-200" @click="select('orange-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-orange-300 text-orange-300 border-orange-300 divide-orange-300 ring-orange-300 outline-orange-300" @click="select('orange-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-orange-400 text-orange-400 border-orange-400 divide-orange-400 ring-orange-400 outline-orange-400" @click="select('orange-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-orange-500 text-orange-500 border-orange-500 divide-orange-500 ring-orange-500 outline-orange-500" @click="select('orange-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-orange-600 text-orange-600 border-orange-600 divide-orange-600 ring-orange-600 outline-orange-600" @click="select('orange-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-orange-700 text-orange-700 border-orange-700 divide-orange-700 ring-orange-700 outline-orange-700" @click="select('orange-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-orange-800 text-orange-800 border-orange-800 divide-orange-800 ring-orange-800 outline-orange-800" @click="select('orange-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-orange-900 text-orange-900 border-orange-900 divide-orange-900 ring-orange-900 outline-orange-900" @click="select('orange-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">amber</div>
    <div class="w-8 h-4 cursor-pointer  bg-amber-50 text-amber-50 border-amber-50 divide-amber-50 ring-amber-50 outline-amber-50" @click="select('amber-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-amber-100 text-amber-100 border-amber-100 divide-amber-100 ring-amber-100 outline-amber-100" @click="select('amber-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-amber-200 text-amber-200 border-amber-200 divide-amber-200 ring-amber-200 outline-amber-200" @click="select('amber-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-amber-300 text-amber-300 border-amber-300 divide-amber-300 ring-amber-300 outline-amber-300" @click="select('amber-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-amber-400 text-amber-400 border-amber-400 divide-amber-400 ring-amber-400 outline-amber-400" @click="select('amber-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-amber-500 text-amber-500 border-amber-500 divide-amber-500 ring-amber-500 outline-amber-500" @click="select('amber-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-amber-600 text-amber-600 border-amber-600 divide-amber-600 ring-amber-600 outline-amber-600" @click="select('amber-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-amber-700 text-amber-700 border-amber-700 divide-amber-700 ring-amber-700 outline-amber-700" @click="select('amber-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-amber-800 text-amber-800 border-amber-800 divide-amber-800 ring-amber-800 outline-amber-800" @click="select('amber-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-amber-900 text-amber-900 border-amber-900 divide-amber-900 ring-amber-900 outline-amber-900" @click="select('amber-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">yellow</div>
    <div class="w-8 h-4 cursor-pointer  bg-yellow-50 text-yellow-50 border-yellow-50 divide-yellow-50 ring-yellow-50 outline-yellow-50" @click="select('yellow-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-yellow-100 text-yellow-100 border-yellow-100 divide-yellow-100 ring-yellow-100 outline-yellow-100" @click="select('yellow-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-yellow-200 text-yellow-200 border-yellow-200 divide-yellow-200 ring-yellow-200 outline-yellow-200" @click="select('yellow-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-yellow-300 text-yellow-300 border-yellow-300 divide-yellow-300 ring-yellow-300 outline-yellow-300" @click="select('yellow-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-yellow-400 text-yellow-400 border-yellow-400 divide-yellow-400 ring-yellow-400 outline-yellow-400" @click="select('yellow-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-yellow-500 text-yellow-500 border-yellow-500 divide-yellow-500 ring-yellow-500 outline-yellow-500" @click="select('yellow-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-yellow-600 text-yellow-600 border-yellow-600 divide-yellow-600 ring-yellow-600 outline-yellow-600" @click="select('yellow-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-yellow-700 text-yellow-700 border-yellow-700 divide-yellow-700 ring-yellow-700 outline-yellow-700" @click="select('yellow-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-yellow-800 text-yellow-800 border-yellow-800 divide-yellow-800 ring-yellow-800 outline-yellow-800" @click="select('yellow-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-yellow-900 text-yellow-900 border-yellow-900 divide-yellow-900 ring-yellow-900 outline-yellow-900" @click="select('yellow-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">lime</div>
    <div class="w-8 h-4 cursor-pointer  bg-lime-50 text-lime-50 border-lime-50 divide-lime-50 ring-lime-50 outline-lime-50" @click="select('lime-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-lime-100 text-lime-100 border-lime-100 divide-lime-100 ring-lime-100 outline-lime-100" @click="select('lime-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-lime-200 text-lime-200 border-lime-200 divide-lime-200 ring-lime-200 outline-lime-200" @click="select('lime-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-lime-300 text-lime-300 border-lime-300 divide-lime-300 ring-lime-300 outline-lime-300" @click="select('lime-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-lime-400 text-lime-400 border-lime-400 divide-lime-400 ring-lime-400 outline-lime-400" @click="select('lime-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-lime-500 text-lime-500 border-lime-500 divide-lime-500 ring-lime-500 outline-lime-500" @click="select('lime-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-lime-600 text-lime-600 border-lime-600 divide-lime-600 ring-lime-600 outline-lime-600" @click="select('lime-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-lime-700 text-lime-700 border-lime-700 divide-lime-700 ring-lime-700 outline-lime-700" @click="select('lime-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-lime-800 text-lime-800 border-lime-800 divide-lime-800 ring-lime-800 outline-lime-800" @click="select('lime-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-lime-900 text-lime-900 border-lime-900 divide-lime-900 ring-lime-900 outline-lime-900" @click="select('lime-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">green</div>
    <div class="w-8 h-4 cursor-pointer  bg-green-50 text-green-50 border-green-50 divide-green-50 ring-green-50 outline-green-50" @click="select('green-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-green-100 text-green-100 border-green-100 divide-green-100 ring-green-100 outline-green-100" @click="select('green-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-green-200 text-green-200 border-green-200 divide-green-200 ring-green-200 outline-green-200" @click="select('green-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-green-300 text-green-300 border-green-300 divide-green-300 ring-green-300 outline-green-300" @click="select('green-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-green-400 text-green-400 border-green-400 divide-green-400 ring-green-400 outline-green-400" @click="select('green-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-green-500 text-green-500 border-green-500 divide-green-500 ring-green-500 outline-green-500" @click="select('green-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-green-600 text-green-600 border-green-600 divide-green-600 ring-green-600 outline-green-600" @click="select('green-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-green-700 text-green-700 border-green-700 divide-green-700 ring-green-700 outline-green-700" @click="select('green-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-green-800 text-green-800 border-green-800 divide-green-800 ring-green-800 outline-green-800" @click="select('green-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-green-900 text-green-900 border-green-900 divide-green-900 ring-green-900 outline-green-900" @click="select('green-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">emerald</div>
    <div class="w-8 h-4 cursor-pointer  bg-emerald-50 text-emerald-50 border-emerald-50 divide-emerald-50 ring-emerald-50 outline-emerald-50" @click="select('emerald-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-emerald-100 text-emerald-100 border-emerald-100 divide-emerald-100 ring-emerald-100 outline-emerald-100" @click="select('emerald-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-emerald-200 text-emerald-200 border-emerald-200 divide-emerald-200 ring-emerald-200 outline-emerald-200" @click="select('emerald-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-emerald-300 text-emerald-300 border-emerald-300 divide-emerald-300 ring-emerald-300 outline-emerald-300" @click="select('emerald-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-emerald-400 text-emerald-400 border-emerald-400 divide-emerald-400 ring-emerald-400 outline-emerald-400" @click="select('emerald-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-emerald-500 text-emerald-500 border-emerald-500 divide-emerald-500 ring-emerald-500 outline-emerald-500" @click="select('emerald-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-emerald-600 text-emerald-600 border-emerald-600 divide-emerald-600 ring-emerald-600 outline-emerald-600" @click="select('emerald-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-emerald-700 text-emerald-700 border-emerald-700 divide-emerald-700 ring-emerald-700 outline-emerald-700" @click="select('emerald-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-emerald-800 text-emerald-800 border-emerald-800 divide-emerald-800 ring-emerald-800 outline-emerald-800" @click="select('emerald-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-emerald-900 text-emerald-900 border-emerald-900 divide-emerald-900 ring-emerald-900 outline-emerald-900" @click="select('emerald-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">teal</div>
    <div class="w-8 h-4 cursor-pointer  bg-teal-50 text-teal-50 border-teal-50 divide-teal-50 ring-teal-50 outline-teal-50" @click="select('teal-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-teal-100 text-teal-100 border-teal-100 divide-teal-100 ring-teal-100 outline-teal-100" @click="select('teal-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-teal-200 text-teal-200 border-teal-200 divide-teal-200 ring-teal-200 outline-teal-200" @click="select('teal-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-teal-300 text-teal-300 border-teal-300 divide-teal-300 ring-teal-300 outline-teal-300" @click="select('teal-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-teal-400 text-teal-400 border-teal-400 divide-teal-400 ring-teal-400 outline-teal-400" @click="select('teal-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-teal-500 text-teal-500 border-teal-500 divide-teal-500 ring-teal-500 outline-teal-500" @click="select('teal-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-teal-600 text-teal-600 border-teal-600 divide-teal-600 ring-teal-600 outline-teal-600" @click="select('teal-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-teal-700 text-teal-700 border-teal-700 divide-teal-700 ring-teal-700 outline-teal-700" @click="select('teal-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-teal-800 text-teal-800 border-teal-800 divide-teal-800 ring-teal-800 outline-teal-800" @click="select('teal-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-teal-900 text-teal-900 border-teal-900 divide-teal-900 ring-teal-900 outline-teal-900" @click="select('teal-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">cyan</div>
    <div class="w-8 h-4 cursor-pointer  bg-cyan-50 text-cyan-50 border-cyan-50 divide-cyan-50 ring-cyan-50 outline-cyan-50" @click="select('cyan-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-cyan-100 text-cyan-100 border-cyan-100 divide-cyan-100 ring-cyan-100 outline-cyan-100" @click="select('cyan-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-cyan-200 text-cyan-200 border-cyan-200 divide-cyan-200 ring-cyan-200 outline-cyan-200" @click="select('cyan-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-cyan-300 text-cyan-300 border-cyan-300 divide-cyan-300 ring-cyan-300 outline-cyan-300" @click="select('cyan-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-cyan-400 text-cyan-400 border-cyan-400 divide-cyan-400 ring-cyan-400 outline-cyan-400" @click="select('cyan-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-cyan-500 text-cyan-500 border-cyan-500 divide-cyan-500 ring-cyan-500 outline-cyan-500" @click="select('cyan-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-cyan-600 text-cyan-600 border-cyan-600 divide-cyan-600 ring-cyan-600 outline-cyan-600" @click="select('cyan-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-cyan-700 text-cyan-700 border-cyan-700 divide-cyan-700 ring-cyan-700 outline-cyan-700" @click="select('cyan-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-cyan-800 text-cyan-800 border-cyan-800 divide-cyan-800 ring-cyan-800 outline-cyan-800" @click="select('cyan-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-cyan-900 text-cyan-900 border-cyan-900 divide-cyan-900 ring-cyan-900 outline-cyan-900" @click="select('cyan-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">sky</div>
    <div class="w-8 h-4 cursor-pointer  bg-sky-50 text-sky-50 border-sky-50 divide-sky-50 ring-sky-50 outline-sky-50" @click="select('sky-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-sky-100 text-sky-100 border-sky-100 divide-sky-100 ring-sky-100 outline-sky-100" @click="select('sky-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-sky-200 text-sky-200 border-sky-200 divide-sky-200 ring-sky-200 outline-sky-200" @click="select('sky-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-sky-300 text-sky-300 border-sky-300 divide-sky-300 ring-sky-300 outline-sky-300" @click="select('sky-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-sky-400 text-sky-400 border-sky-400 divide-sky-400 ring-sky-400 outline-sky-400" @click="select('sky-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-sky-500 text-sky-500 border-sky-500 divide-sky-500 ring-sky-500 outline-sky-500" @click="select('sky-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-sky-600 text-sky-600 border-sky-600 divide-sky-600 ring-sky-600 outline-sky-600" @click="select('sky-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-sky-700 text-sky-700 border-sky-700 divide-sky-700 ring-sky-700 outline-sky-700" @click="select('sky-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-sky-800 text-sky-800 border-sky-800 divide-sky-800 ring-sky-800 outline-sky-800" @click="select('sky-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-sky-900 text-sky-900 border-sky-900 divide-sky-900 ring-sky-900 outline-sky-900" @click="select('sky-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">blue</div>
    <div class="w-8 h-4 cursor-pointer  bg-blue-50 text-blue-50 border-blue-50 divide-blue-50 ring-blue-50 outline-blue-50" @click="select('blue-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-blue-100 text-blue-100 border-blue-100 divide-blue-100 ring-blue-100 outline-blue-100" @click="select('blue-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-blue-200 text-blue-200 border-blue-200 divide-blue-200 ring-blue-200 outline-blue-200" @click="select('blue-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-blue-300 text-blue-300 border-blue-300 divide-blue-300 ring-blue-300 outline-blue-300" @click="select('blue-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-blue-400 text-blue-400 border-blue-400 divide-blue-400 ring-blue-400 outline-blue-400" @click="select('blue-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-blue-500 text-blue-500 border-blue-500 divide-blue-500 ring-blue-500 outline-blue-500" @click="select('blue-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-blue-600 text-blue-600 border-blue-600 divide-blue-600 ring-blue-600 outline-blue-600" @click="select('blue-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-blue-700 text-blue-700 border-blue-700 divide-blue-700 ring-blue-700 outline-blue-700" @click="select('blue-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-blue-800 text-blue-800 border-blue-800 divide-blue-800 ring-blue-800 outline-blue-800" @click="select('blue-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-blue-900 text-blue-900 border-blue-900 divide-blue-900 ring-blue-900 outline-blue-900" @click="select('blue-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">indigo</div>
    <div class="w-8 h-4 cursor-pointer  bg-indigo-50 text-indigo-50 border-indigo-50 divide-indigo-50 ring-indigo-50 outline-indigo-50" @click="select('indigo-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-indigo-100 text-indigo-100 border-indigo-100 divide-indigo-100 ring-indigo-100 outline-indigo-100" @click="select('indigo-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-indigo-200 text-indigo-200 border-indigo-200 divide-indigo-200 ring-indigo-200 outline-indigo-200" @click="select('indigo-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-indigo-300 text-indigo-300 border-indigo-300 divide-indigo-300 ring-indigo-300 outline-indigo-300" @click="select('indigo-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-indigo-400 text-indigo-400 border-indigo-400 divide-indigo-400 ring-indigo-400 outline-indigo-400" @click="select('indigo-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-indigo-500 text-indigo-500 border-indigo-500 divide-indigo-500 ring-indigo-500 outline-indigo-500" @click="select('indigo-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-indigo-600 text-indigo-600 border-indigo-600 divide-indigo-600 ring-indigo-600 outline-indigo-600" @click="select('indigo-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-indigo-700 text-indigo-700 border-indigo-700 divide-indigo-700 ring-indigo-700 outline-indigo-700" @click="select('indigo-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-indigo-800 text-indigo-800 border-indigo-800 divide-indigo-800 ring-indigo-800 outline-indigo-800" @click="select('indigo-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-indigo-900 text-indigo-900 border-indigo-900 divide-indigo-900 ring-indigo-900 outline-indigo-900" @click="select('indigo-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">violet</div>
    <div class="w-8 h-4 cursor-pointer  bg-violet-50 text-violet-50 border-violet-50 divide-violet-50 ring-violet-50 outline-violet-50" @click="select('violet-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-violet-100 text-violet-100 border-violet-100 divide-violet-100 ring-violet-100 outline-violet-100" @click="select('violet-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-violet-200 text-violet-200 border-violet-200 divide-violet-200 ring-violet-200 outline-violet-200" @click="select('violet-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-violet-300 text-violet-300 border-violet-300 divide-violet-300 ring-violet-300 outline-violet-300" @click="select('violet-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-violet-400 text-violet-400 border-violet-400 divide-violet-400 ring-violet-400 outline-violet-400" @click="select('violet-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-violet-500 text-violet-500 border-violet-500 divide-violet-500 ring-violet-500 outline-violet-500" @click="select('violet-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-violet-600 text-violet-600 border-violet-600 divide-violet-600 ring-violet-600 outline-violet-600" @click="select('violet-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-violet-700 text-violet-700 border-violet-700 divide-violet-700 ring-violet-700 outline-violet-700" @click="select('violet-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-violet-800 text-violet-800 border-violet-800 divide-violet-800 ring-violet-800 outline-violet-800" @click="select('violet-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-violet-900 text-violet-900 border-violet-900 divide-violet-900 ring-violet-900 outline-violet-900" @click="select('violet-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">purple</div>
    <div class="w-8 h-4 cursor-pointer  bg-purple-50 text-purple-50 border-purple-50 divide-purple-50 ring-purple-50 outline-purple-50" @click="select('purple-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-purple-100 text-purple-100 border-purple-100 divide-purple-100 ring-purple-100 outline-purple-100" @click="select('purple-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-purple-200 text-purple-200 border-purple-200 divide-purple-200 ring-purple-200 outline-purple-200" @click="select('purple-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-purple-300 text-purple-300 border-purple-300 divide-purple-300 ring-purple-300 outline-purple-300" @click="select('purple-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-purple-400 text-purple-400 border-purple-400 divide-purple-400 ring-purple-400 outline-purple-400" @click="select('purple-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-purple-500 text-purple-500 border-purple-500 divide-purple-500 ring-purple-500 outline-purple-500" @click="select('purple-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-purple-600 text-purple-600 border-purple-600 divide-purple-600 ring-purple-600 outline-purple-600" @click="select('purple-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-purple-700 text-purple-700 border-purple-700 divide-purple-700 ring-purple-700 outline-purple-700" @click="select('purple-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-purple-800 text-purple-800 border-purple-800 divide-purple-800 ring-purple-800 outline-purple-800" @click="select('purple-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-purple-900 text-purple-900 border-purple-900 divide-purple-900 ring-purple-900 outline-purple-900" @click="select('purple-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">fuchsia</div>
    <div class="w-8 h-4 cursor-pointer  bg-fuchsia-50 text-fuchsia-50 border-fuchsia-50 divide-fuchsia-50 ring-fuchsia-50 outline-fuchsia-50" @click="select('fuchsia-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-fuchsia-100 text-fuchsia-100 border-fuchsia-100 divide-fuchsia-100 ring-fuchsia-100 outline-fuchsia-100" @click="select('fuchsia-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-fuchsia-200 text-fuchsia-200 border-fuchsia-200 divide-fuchsia-200 ring-fuchsia-200 outline-fuchsia-200" @click="select('fuchsia-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-fuchsia-300 text-fuchsia-300 border-fuchsia-300 divide-fuchsia-300 ring-fuchsia-300 outline-fuchsia-300" @click="select('fuchsia-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-fuchsia-400 text-fuchsia-400 border-fuchsia-400 divide-fuchsia-400 ring-fuchsia-400 outline-fuchsia-400" @click="select('fuchsia-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-fuchsia-500 text-fuchsia-500 border-fuchsia-500 divide-fuchsia-500 ring-fuchsia-500 outline-fuchsia-500" @click="select('fuchsia-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-fuchsia-600 text-fuchsia-600 border-fuchsia-600 divide-fuchsia-600 ring-fuchsia-600 outline-fuchsia-600" @click="select('fuchsia-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-fuchsia-700 text-fuchsia-700 border-fuchsia-700 divide-fuchsia-700 ring-fuchsia-700 outline-fuchsia-700" @click="select('fuchsia-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-fuchsia-800 text-fuchsia-800 border-fuchsia-800 divide-fuchsia-800 ring-fuchsia-800 outline-fuchsia-800" @click="select('fuchsia-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-fuchsia-900 text-fuchsia-900 border-fuchsia-900 divide-fuchsia-900 ring-fuchsia-900 outline-fuchsia-900" @click="select('fuchsia-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">pink</div>
    <div class="w-8 h-4 cursor-pointer  bg-pink-50 text-pink-50 border-pink-50 divide-pink-50 ring-pink-50 outline-pink-50" @click="select('pink-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-pink-100 text-pink-100 border-pink-100 divide-pink-100 ring-pink-100 outline-pink-100" @click="select('pink-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-pink-200 text-pink-200 border-pink-200 divide-pink-200 ring-pink-200 outline-pink-200" @click="select('pink-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-pink-300 text-pink-300 border-pink-300 divide-pink-300 ring-pink-300 outline-pink-300" @click="select('pink-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-pink-400 text-pink-400 border-pink-400 divide-pink-400 ring-pink-400 outline-pink-400" @click="select('pink-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-pink-500 text-pink-500 border-pink-500 divide-pink-500 ring-pink-500 outline-pink-500" @click="select('pink-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-pink-600 text-pink-600 border-pink-600 divide-pink-600 ring-pink-600 outline-pink-600" @click="select('pink-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-pink-700 text-pink-700 border-pink-700 divide-pink-700 ring-pink-700 outline-pink-700" @click="select('pink-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-pink-800 text-pink-800 border-pink-800 divide-pink-800 ring-pink-800 outline-pink-800" @click="select('pink-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-pink-900 text-pink-900 border-pink-900 divide-pink-900 ring-pink-900 outline-pink-900" @click="select('pink-900')"> </div>
    </div>
    <div class="flex h-5"> <div class="w-40">rose</div>
    <div class="w-8 h-4 cursor-pointer  bg-rose-50 text-rose-50 border-rose-50 divide-rose-50 ring-rose-50 outline-rose-50" @click="select('rose-50')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-rose-100 text-rose-100 border-rose-100 divide-rose-100 ring-rose-100 outline-rose-100" @click="select('rose-100')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-rose-200 text-rose-200 border-rose-200 divide-rose-200 ring-rose-200 outline-rose-200" @click="select('rose-200')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-rose-300 text-rose-300 border-rose-300 divide-rose-300 ring-rose-300 outline-rose-300" @click="select('rose-300')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-rose-400 text-rose-400 border-rose-400 divide-rose-400 ring-rose-400 outline-rose-400" @click="select('rose-400')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-rose-500 text-rose-500 border-rose-500 divide-rose-500 ring-rose-500 outline-rose-500" @click="select('rose-500')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-rose-600 text-rose-600 border-rose-600 divide-rose-600 ring-rose-600 outline-rose-600" @click="select('rose-600')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-rose-700 text-rose-700 border-rose-700 divide-rose-700 ring-rose-700 outline-rose-700" @click="select('rose-700')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-rose-800 text-rose-800 border-rose-800 divide-rose-800 ring-rose-800 outline-rose-800" @click="select('rose-800')"> </div>
    <div class="w-8 h-4 cursor-pointer  bg-rose-900 text-rose-900 border-rose-900 divide-rose-900 ring-rose-900 outline-rose-900" @click="select('rose-900')"> </div>
    </div>
    <div class="w-full flex justify-center gap-10">
      <button class="rounded-full p-2 bg-slate-100" @click="cancel">Cancel</button>
      <button class="rounded-full p-2 bg-slate-100" @click="close">Close</button>
    </div>
    
</div> 
 
</template>
<script setup>
  import { ref } from 'vue'

  const props = defineProps(['color', 'originalColor'])
  const emit = defineEmits(['update:color', 'close'])

  const currentColor = computed(() => {
    const color = props.color.split('/')
    return { color: color[0], opacity:  color[1] || '100' }
  })

  const colorNames = ref(['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 
'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'])
  const colorValues = ref([50, 100, 200, 300, 400, 500, 600, 700, 800, 900])

  const opacityValues = ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']

  function selectOpacity(opacity) {
    update(currentColor.value.color, opacity)
  }

  function select(color) {
    update(color, currentColor.value.opacity)
  }

  function cancel() {
    // get open color
    emit('update:color', props.originalColor)
    close()
  }

  function close() {
    emit('close')
  }

  function update(color, opacity) {
    const finalColor = opacity === '100' ? color : `${color}/${opacity}` 
    emit('update:color', finalColor)
  }
</script>