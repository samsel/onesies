"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/js-tiktoken@1.0.16";
exports.ids = ["vendor-chunks/js-tiktoken@1.0.16"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/js-tiktoken@1.0.16/node_modules/js-tiktoken/dist/chunk-3652LHBA.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/.pnpm/js-tiktoken@1.0.16/node_modules/js-tiktoken/dist/chunk-3652LHBA.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Tiktoken: () => (/* binding */ Tiktoken),\n/* harmony export */   getEncodingNameForModel: () => (/* binding */ getEncodingNameForModel),\n/* harmony export */   never: () => (/* binding */ never)\n/* harmony export */ });\n/* harmony import */ var base64_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! base64-js */ \"(rsc)/./node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js\");\n\n\nvar __defProp = Object.defineProperty;\nvar __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;\nvar __publicField = (obj, key, value) => {\n  __defNormalProp(obj, typeof key !== \"symbol\" ? key + \"\" : key, value);\n  return value;\n};\n\n// src/utils.ts\nfunction never(_) {\n}\nfunction bytePairMerge(piece, ranks) {\n  let parts = Array.from(\n    { length: piece.length },\n    (_, i) => ({ start: i, end: i + 1 })\n  );\n  while (parts.length > 1) {\n    let minRank = null;\n    for (let i = 0; i < parts.length - 1; i++) {\n      const slice = piece.slice(parts[i].start, parts[i + 1].end);\n      const rank = ranks.get(slice.join(\",\"));\n      if (rank == null)\n        continue;\n      if (minRank == null || rank < minRank[0]) {\n        minRank = [rank, i];\n      }\n    }\n    if (minRank != null) {\n      const i = minRank[1];\n      parts[i] = { start: parts[i].start, end: parts[i + 1].end };\n      parts.splice(i + 1, 1);\n    } else {\n      break;\n    }\n  }\n  return parts;\n}\nfunction bytePairEncode(piece, ranks) {\n  if (piece.length === 1)\n    return [ranks.get(piece.join(\",\"))];\n  return bytePairMerge(piece, ranks).map((p) => ranks.get(piece.slice(p.start, p.end).join(\",\"))).filter((x) => x != null);\n}\nfunction escapeRegex(str) {\n  return str.replace(/[\\\\^$*+?.()|[\\]{}]/g, \"\\\\$&\");\n}\nvar _Tiktoken = class {\n  /** @internal */\n  specialTokens;\n  /** @internal */\n  inverseSpecialTokens;\n  /** @internal */\n  patStr;\n  /** @internal */\n  textEncoder = new TextEncoder();\n  /** @internal */\n  textDecoder = new TextDecoder(\"utf-8\");\n  /** @internal */\n  rankMap = /* @__PURE__ */ new Map();\n  /** @internal */\n  textMap = /* @__PURE__ */ new Map();\n  constructor(ranks, extendedSpecialTokens) {\n    this.patStr = ranks.pat_str;\n    const uncompressed = ranks.bpe_ranks.split(\"\\n\").filter(Boolean).reduce((memo, x) => {\n      const [_, offsetStr, ...tokens] = x.split(\" \");\n      const offset = Number.parseInt(offsetStr, 10);\n      tokens.forEach((token, i) => memo[token] = offset + i);\n      return memo;\n    }, {});\n    for (const [token, rank] of Object.entries(uncompressed)) {\n      const bytes = base64_js__WEBPACK_IMPORTED_MODULE_0__.toByteArray(token);\n      this.rankMap.set(bytes.join(\",\"), rank);\n      this.textMap.set(rank, bytes);\n    }\n    this.specialTokens = { ...ranks.special_tokens, ...extendedSpecialTokens };\n    this.inverseSpecialTokens = Object.entries(this.specialTokens).reduce((memo, [text, rank]) => {\n      memo[rank] = this.textEncoder.encode(text);\n      return memo;\n    }, {});\n  }\n  encode(text, allowedSpecial = [], disallowedSpecial = \"all\") {\n    const regexes = new RegExp(this.patStr, \"ug\");\n    const specialRegex = _Tiktoken.specialTokenRegex(\n      Object.keys(this.specialTokens)\n    );\n    const ret = [];\n    const allowedSpecialSet = new Set(\n      allowedSpecial === \"all\" ? Object.keys(this.specialTokens) : allowedSpecial\n    );\n    const disallowedSpecialSet = new Set(\n      disallowedSpecial === \"all\" ? Object.keys(this.specialTokens).filter(\n        (x) => !allowedSpecialSet.has(x)\n      ) : disallowedSpecial\n    );\n    if (disallowedSpecialSet.size > 0) {\n      const disallowedSpecialRegex = _Tiktoken.specialTokenRegex([\n        ...disallowedSpecialSet\n      ]);\n      const specialMatch = text.match(disallowedSpecialRegex);\n      if (specialMatch != null) {\n        throw new Error(\n          `The text contains a special token that is not allowed: ${specialMatch[0]}`\n        );\n      }\n    }\n    let start = 0;\n    while (true) {\n      let nextSpecial = null;\n      let startFind = start;\n      while (true) {\n        specialRegex.lastIndex = startFind;\n        nextSpecial = specialRegex.exec(text);\n        if (nextSpecial == null || allowedSpecialSet.has(nextSpecial[0]))\n          break;\n        startFind = nextSpecial.index + 1;\n      }\n      const end = nextSpecial?.index ?? text.length;\n      for (const match of text.substring(start, end).matchAll(regexes)) {\n        const piece = this.textEncoder.encode(match[0]);\n        const token2 = this.rankMap.get(piece.join(\",\"));\n        if (token2 != null) {\n          ret.push(token2);\n          continue;\n        }\n        ret.push(...bytePairEncode(piece, this.rankMap));\n      }\n      if (nextSpecial == null)\n        break;\n      let token = this.specialTokens[nextSpecial[0]];\n      ret.push(token);\n      start = nextSpecial.index + nextSpecial[0].length;\n    }\n    return ret;\n  }\n  decode(tokens) {\n    const res = [];\n    let length = 0;\n    for (let i2 = 0; i2 < tokens.length; ++i2) {\n      const token = tokens[i2];\n      const bytes = this.textMap.get(token) ?? this.inverseSpecialTokens[token];\n      if (bytes != null) {\n        res.push(bytes);\n        length += bytes.length;\n      }\n    }\n    const mergedArray = new Uint8Array(length);\n    let i = 0;\n    for (const bytes of res) {\n      mergedArray.set(bytes, i);\n      i += bytes.length;\n    }\n    return this.textDecoder.decode(mergedArray);\n  }\n};\nvar Tiktoken = _Tiktoken;\n__publicField(Tiktoken, \"specialTokenRegex\", (tokens) => {\n  return new RegExp(tokens.map((i) => escapeRegex(i)).join(\"|\"), \"g\");\n});\nfunction getEncodingNameForModel(model) {\n  switch (model) {\n    case \"gpt2\": {\n      return \"gpt2\";\n    }\n    case \"code-cushman-001\":\n    case \"code-cushman-002\":\n    case \"code-davinci-001\":\n    case \"code-davinci-002\":\n    case \"cushman-codex\":\n    case \"davinci-codex\":\n    case \"davinci-002\":\n    case \"text-davinci-002\":\n    case \"text-davinci-003\": {\n      return \"p50k_base\";\n    }\n    case \"code-davinci-edit-001\":\n    case \"text-davinci-edit-001\": {\n      return \"p50k_edit\";\n    }\n    case \"ada\":\n    case \"babbage\":\n    case \"babbage-002\":\n    case \"code-search-ada-code-001\":\n    case \"code-search-babbage-code-001\":\n    case \"curie\":\n    case \"davinci\":\n    case \"text-ada-001\":\n    case \"text-babbage-001\":\n    case \"text-curie-001\":\n    case \"text-davinci-001\":\n    case \"text-search-ada-doc-001\":\n    case \"text-search-babbage-doc-001\":\n    case \"text-search-curie-doc-001\":\n    case \"text-search-davinci-doc-001\":\n    case \"text-similarity-ada-001\":\n    case \"text-similarity-babbage-001\":\n    case \"text-similarity-curie-001\":\n    case \"text-similarity-davinci-001\": {\n      return \"r50k_base\";\n    }\n    case \"gpt-3.5-turbo-instruct-0914\":\n    case \"gpt-3.5-turbo-instruct\":\n    case \"gpt-3.5-turbo-16k-0613\":\n    case \"gpt-3.5-turbo-16k\":\n    case \"gpt-3.5-turbo-0613\":\n    case \"gpt-3.5-turbo-0301\":\n    case \"gpt-3.5-turbo\":\n    case \"gpt-4-32k-0613\":\n    case \"gpt-4-32k-0314\":\n    case \"gpt-4-32k\":\n    case \"gpt-4-0613\":\n    case \"gpt-4-0314\":\n    case \"gpt-4\":\n    case \"gpt-3.5-turbo-1106\":\n    case \"gpt-35-turbo\":\n    case \"gpt-4-1106-preview\":\n    case \"gpt-4-vision-preview\":\n    case \"gpt-3.5-turbo-0125\":\n    case \"gpt-4-turbo\":\n    case \"gpt-4-turbo-2024-04-09\":\n    case \"gpt-4-turbo-preview\":\n    case \"gpt-4-0125-preview\":\n    case \"text-embedding-ada-002\":\n    case \"text-embedding-3-small\":\n    case \"text-embedding-3-large\": {\n      return \"cl100k_base\";\n    }\n    case \"gpt-4o\":\n    case \"gpt-4o-2024-05-13\":\n    case \"gpt-4o-2024-08-06\":\n    case \"gpt-4o-mini-2024-07-18\":\n    case \"gpt-4o-mini\":\n    case \"o1-2024-12-17\":\n    case \"o1-mini\":\n    case \"o1-preview\":\n    case \"o1-preview-2024-09-12\":\n    case \"o1-mini-2024-09-12\":\n    case \"chatgpt-4o-latest\":\n    case \"gpt-4o-realtime\":\n    case \"gpt-4o-realtime-preview-2024-10-01\": {\n      return \"o200k_base\";\n    }\n    default:\n      throw new Error(\"Unknown model\");\n  }\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vanMtdGlrdG9rZW5AMS4wLjE2L25vZGVfbW9kdWxlcy9qcy10aWt0b2tlbi9kaXN0L2NodW5rLTM2NTJMSEJBLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBK0I7O0FBRS9CO0FBQ0EsOEVBQThFLDZEQUE2RDtBQUMzSTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxzQkFBc0I7QUFDNUIsaUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssSUFBSTtBQUNUO0FBQ0Esb0JBQW9CLGtEQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsS0FBSyxJQUFJO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0UsZ0JBQWdCO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0JBQW9CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFb0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sYW5nY2hhaW4tbmV4dGpzLXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2pzLXRpa3Rva2VuQDEuMC4xNi9ub2RlX21vZHVsZXMvanMtdGlrdG9rZW4vZGlzdC9jaHVuay0zNjUyTEhCQS5qcz8yZGU2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiYXNlNjQgZnJvbSAnYmFzZTY0LWpzJztcblxudmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX2RlZk5vcm1hbFByb3AgPSAob2JqLCBrZXksIHZhbHVlKSA9PiBrZXkgaW4gb2JqID8gX19kZWZQcm9wKG9iaiwga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUsIHZhbHVlIH0pIDogb2JqW2tleV0gPSB2YWx1ZTtcbnZhciBfX3B1YmxpY0ZpZWxkID0gKG9iaiwga2V5LCB2YWx1ZSkgPT4ge1xuICBfX2RlZk5vcm1hbFByb3Aob2JqLCB0eXBlb2Yga2V5ICE9PSBcInN5bWJvbFwiID8ga2V5ICsgXCJcIiA6IGtleSwgdmFsdWUpO1xuICByZXR1cm4gdmFsdWU7XG59O1xuXG4vLyBzcmMvdXRpbHMudHNcbmZ1bmN0aW9uIG5ldmVyKF8pIHtcbn1cbmZ1bmN0aW9uIGJ5dGVQYWlyTWVyZ2UocGllY2UsIHJhbmtzKSB7XG4gIGxldCBwYXJ0cyA9IEFycmF5LmZyb20oXG4gICAgeyBsZW5ndGg6IHBpZWNlLmxlbmd0aCB9LFxuICAgIChfLCBpKSA9PiAoeyBzdGFydDogaSwgZW5kOiBpICsgMSB9KVxuICApO1xuICB3aGlsZSAocGFydHMubGVuZ3RoID4gMSkge1xuICAgIGxldCBtaW5SYW5rID0gbnVsbDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgY29uc3Qgc2xpY2UgPSBwaWVjZS5zbGljZShwYXJ0c1tpXS5zdGFydCwgcGFydHNbaSArIDFdLmVuZCk7XG4gICAgICBjb25zdCByYW5rID0gcmFua3MuZ2V0KHNsaWNlLmpvaW4oXCIsXCIpKTtcbiAgICAgIGlmIChyYW5rID09IG51bGwpXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgaWYgKG1pblJhbmsgPT0gbnVsbCB8fCByYW5rIDwgbWluUmFua1swXSkge1xuICAgICAgICBtaW5SYW5rID0gW3JhbmssIGldO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobWluUmFuayAhPSBudWxsKSB7XG4gICAgICBjb25zdCBpID0gbWluUmFua1sxXTtcbiAgICAgIHBhcnRzW2ldID0geyBzdGFydDogcGFydHNbaV0uc3RhcnQsIGVuZDogcGFydHNbaSArIDFdLmVuZCB9O1xuICAgICAgcGFydHMuc3BsaWNlKGkgKyAxLCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBwYXJ0cztcbn1cbmZ1bmN0aW9uIGJ5dGVQYWlyRW5jb2RlKHBpZWNlLCByYW5rcykge1xuICBpZiAocGllY2UubGVuZ3RoID09PSAxKVxuICAgIHJldHVybiBbcmFua3MuZ2V0KHBpZWNlLmpvaW4oXCIsXCIpKV07XG4gIHJldHVybiBieXRlUGFpck1lcmdlKHBpZWNlLCByYW5rcykubWFwKChwKSA9PiByYW5rcy5nZXQocGllY2Uuc2xpY2UocC5zdGFydCwgcC5lbmQpLmpvaW4oXCIsXCIpKSkuZmlsdGVyKCh4KSA9PiB4ICE9IG51bGwpO1xufVxuZnVuY3Rpb24gZXNjYXBlUmVnZXgoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvW1xcXFxeJCorPy4oKXxbXFxde31dL2csIFwiXFxcXCQmXCIpO1xufVxudmFyIF9UaWt0b2tlbiA9IGNsYXNzIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBzcGVjaWFsVG9rZW5zO1xuICAvKiogQGludGVybmFsICovXG4gIGludmVyc2VTcGVjaWFsVG9rZW5zO1xuICAvKiogQGludGVybmFsICovXG4gIHBhdFN0cjtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICB0ZXh0RW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xuICAvKiogQGludGVybmFsICovXG4gIHRleHREZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKFwidXRmLThcIik7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcmFua01hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgdGV4dE1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gIGNvbnN0cnVjdG9yKHJhbmtzLCBleHRlbmRlZFNwZWNpYWxUb2tlbnMpIHtcbiAgICB0aGlzLnBhdFN0ciA9IHJhbmtzLnBhdF9zdHI7XG4gICAgY29uc3QgdW5jb21wcmVzc2VkID0gcmFua3MuYnBlX3JhbmtzLnNwbGl0KFwiXFxuXCIpLmZpbHRlcihCb29sZWFuKS5yZWR1Y2UoKG1lbW8sIHgpID0+IHtcbiAgICAgIGNvbnN0IFtfLCBvZmZzZXRTdHIsIC4uLnRva2Vuc10gPSB4LnNwbGl0KFwiIFwiKTtcbiAgICAgIGNvbnN0IG9mZnNldCA9IE51bWJlci5wYXJzZUludChvZmZzZXRTdHIsIDEwKTtcbiAgICAgIHRva2Vucy5mb3JFYWNoKCh0b2tlbiwgaSkgPT4gbWVtb1t0b2tlbl0gPSBvZmZzZXQgKyBpKTtcbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH0sIHt9KTtcbiAgICBmb3IgKGNvbnN0IFt0b2tlbiwgcmFua10gb2YgT2JqZWN0LmVudHJpZXModW5jb21wcmVzc2VkKSkge1xuICAgICAgY29uc3QgYnl0ZXMgPSBiYXNlNjQudG9CeXRlQXJyYXkodG9rZW4pO1xuICAgICAgdGhpcy5yYW5rTWFwLnNldChieXRlcy5qb2luKFwiLFwiKSwgcmFuayk7XG4gICAgICB0aGlzLnRleHRNYXAuc2V0KHJhbmssIGJ5dGVzKTtcbiAgICB9XG4gICAgdGhpcy5zcGVjaWFsVG9rZW5zID0geyAuLi5yYW5rcy5zcGVjaWFsX3Rva2VucywgLi4uZXh0ZW5kZWRTcGVjaWFsVG9rZW5zIH07XG4gICAgdGhpcy5pbnZlcnNlU3BlY2lhbFRva2VucyA9IE9iamVjdC5lbnRyaWVzKHRoaXMuc3BlY2lhbFRva2VucykucmVkdWNlKChtZW1vLCBbdGV4dCwgcmFua10pID0+IHtcbiAgICAgIG1lbW9bcmFua10gPSB0aGlzLnRleHRFbmNvZGVyLmVuY29kZSh0ZXh0KTtcbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH0sIHt9KTtcbiAgfVxuICBlbmNvZGUodGV4dCwgYWxsb3dlZFNwZWNpYWwgPSBbXSwgZGlzYWxsb3dlZFNwZWNpYWwgPSBcImFsbFwiKSB7XG4gICAgY29uc3QgcmVnZXhlcyA9IG5ldyBSZWdFeHAodGhpcy5wYXRTdHIsIFwidWdcIik7XG4gICAgY29uc3Qgc3BlY2lhbFJlZ2V4ID0gX1Rpa3Rva2VuLnNwZWNpYWxUb2tlblJlZ2V4KFxuICAgICAgT2JqZWN0LmtleXModGhpcy5zcGVjaWFsVG9rZW5zKVxuICAgICk7XG4gICAgY29uc3QgcmV0ID0gW107XG4gICAgY29uc3QgYWxsb3dlZFNwZWNpYWxTZXQgPSBuZXcgU2V0KFxuICAgICAgYWxsb3dlZFNwZWNpYWwgPT09IFwiYWxsXCIgPyBPYmplY3Qua2V5cyh0aGlzLnNwZWNpYWxUb2tlbnMpIDogYWxsb3dlZFNwZWNpYWxcbiAgICApO1xuICAgIGNvbnN0IGRpc2FsbG93ZWRTcGVjaWFsU2V0ID0gbmV3IFNldChcbiAgICAgIGRpc2FsbG93ZWRTcGVjaWFsID09PSBcImFsbFwiID8gT2JqZWN0LmtleXModGhpcy5zcGVjaWFsVG9rZW5zKS5maWx0ZXIoXG4gICAgICAgICh4KSA9PiAhYWxsb3dlZFNwZWNpYWxTZXQuaGFzKHgpXG4gICAgICApIDogZGlzYWxsb3dlZFNwZWNpYWxcbiAgICApO1xuICAgIGlmIChkaXNhbGxvd2VkU3BlY2lhbFNldC5zaXplID4gMCkge1xuICAgICAgY29uc3QgZGlzYWxsb3dlZFNwZWNpYWxSZWdleCA9IF9UaWt0b2tlbi5zcGVjaWFsVG9rZW5SZWdleChbXG4gICAgICAgIC4uLmRpc2FsbG93ZWRTcGVjaWFsU2V0XG4gICAgICBdKTtcbiAgICAgIGNvbnN0IHNwZWNpYWxNYXRjaCA9IHRleHQubWF0Y2goZGlzYWxsb3dlZFNwZWNpYWxSZWdleCk7XG4gICAgICBpZiAoc3BlY2lhbE1hdGNoICE9IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBUaGUgdGV4dCBjb250YWlucyBhIHNwZWNpYWwgdG9rZW4gdGhhdCBpcyBub3QgYWxsb3dlZDogJHtzcGVjaWFsTWF0Y2hbMF19YFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3RhcnQgPSAwO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBsZXQgbmV4dFNwZWNpYWwgPSBudWxsO1xuICAgICAgbGV0IHN0YXJ0RmluZCA9IHN0YXJ0O1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgc3BlY2lhbFJlZ2V4Lmxhc3RJbmRleCA9IHN0YXJ0RmluZDtcbiAgICAgICAgbmV4dFNwZWNpYWwgPSBzcGVjaWFsUmVnZXguZXhlYyh0ZXh0KTtcbiAgICAgICAgaWYgKG5leHRTcGVjaWFsID09IG51bGwgfHwgYWxsb3dlZFNwZWNpYWxTZXQuaGFzKG5leHRTcGVjaWFsWzBdKSlcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgc3RhcnRGaW5kID0gbmV4dFNwZWNpYWwuaW5kZXggKyAxO1xuICAgICAgfVxuICAgICAgY29uc3QgZW5kID0gbmV4dFNwZWNpYWw/LmluZGV4ID8/IHRleHQubGVuZ3RoO1xuICAgICAgZm9yIChjb25zdCBtYXRjaCBvZiB0ZXh0LnN1YnN0cmluZyhzdGFydCwgZW5kKS5tYXRjaEFsbChyZWdleGVzKSkge1xuICAgICAgICBjb25zdCBwaWVjZSA9IHRoaXMudGV4dEVuY29kZXIuZW5jb2RlKG1hdGNoWzBdKTtcbiAgICAgICAgY29uc3QgdG9rZW4yID0gdGhpcy5yYW5rTWFwLmdldChwaWVjZS5qb2luKFwiLFwiKSk7XG4gICAgICAgIGlmICh0b2tlbjIgIT0gbnVsbCkge1xuICAgICAgICAgIHJldC5wdXNoKHRva2VuMik7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0LnB1c2goLi4uYnl0ZVBhaXJFbmNvZGUocGllY2UsIHRoaXMucmFua01hcCkpO1xuICAgICAgfVxuICAgICAgaWYgKG5leHRTcGVjaWFsID09IG51bGwpXG4gICAgICAgIGJyZWFrO1xuICAgICAgbGV0IHRva2VuID0gdGhpcy5zcGVjaWFsVG9rZW5zW25leHRTcGVjaWFsWzBdXTtcbiAgICAgIHJldC5wdXNoKHRva2VuKTtcbiAgICAgIHN0YXJ0ID0gbmV4dFNwZWNpYWwuaW5kZXggKyBuZXh0U3BlY2lhbFswXS5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgZGVjb2RlKHRva2Vucykge1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGZvciAobGV0IGkyID0gMDsgaTIgPCB0b2tlbnMubGVuZ3RoOyArK2kyKSB7XG4gICAgICBjb25zdCB0b2tlbiA9IHRva2Vuc1tpMl07XG4gICAgICBjb25zdCBieXRlcyA9IHRoaXMudGV4dE1hcC5nZXQodG9rZW4pID8/IHRoaXMuaW52ZXJzZVNwZWNpYWxUb2tlbnNbdG9rZW5dO1xuICAgICAgaWYgKGJ5dGVzICE9IG51bGwpIHtcbiAgICAgICAgcmVzLnB1c2goYnl0ZXMpO1xuICAgICAgICBsZW5ndGggKz0gYnl0ZXMubGVuZ3RoO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBtZXJnZWRBcnJheSA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgbGV0IGkgPSAwO1xuICAgIGZvciAoY29uc3QgYnl0ZXMgb2YgcmVzKSB7XG4gICAgICBtZXJnZWRBcnJheS5zZXQoYnl0ZXMsIGkpO1xuICAgICAgaSArPSBieXRlcy5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRleHREZWNvZGVyLmRlY29kZShtZXJnZWRBcnJheSk7XG4gIH1cbn07XG52YXIgVGlrdG9rZW4gPSBfVGlrdG9rZW47XG5fX3B1YmxpY0ZpZWxkKFRpa3Rva2VuLCBcInNwZWNpYWxUb2tlblJlZ2V4XCIsICh0b2tlbnMpID0+IHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAodG9rZW5zLm1hcCgoaSkgPT4gZXNjYXBlUmVnZXgoaSkpLmpvaW4oXCJ8XCIpLCBcImdcIik7XG59KTtcbmZ1bmN0aW9uIGdldEVuY29kaW5nTmFtZUZvck1vZGVsKG1vZGVsKSB7XG4gIHN3aXRjaCAobW9kZWwpIHtcbiAgICBjYXNlIFwiZ3B0MlwiOiB7XG4gICAgICByZXR1cm4gXCJncHQyXCI7XG4gICAgfVxuICAgIGNhc2UgXCJjb2RlLWN1c2htYW4tMDAxXCI6XG4gICAgY2FzZSBcImNvZGUtY3VzaG1hbi0wMDJcIjpcbiAgICBjYXNlIFwiY29kZS1kYXZpbmNpLTAwMVwiOlxuICAgIGNhc2UgXCJjb2RlLWRhdmluY2ktMDAyXCI6XG4gICAgY2FzZSBcImN1c2htYW4tY29kZXhcIjpcbiAgICBjYXNlIFwiZGF2aW5jaS1jb2RleFwiOlxuICAgIGNhc2UgXCJkYXZpbmNpLTAwMlwiOlxuICAgIGNhc2UgXCJ0ZXh0LWRhdmluY2ktMDAyXCI6XG4gICAgY2FzZSBcInRleHQtZGF2aW5jaS0wMDNcIjoge1xuICAgICAgcmV0dXJuIFwicDUwa19iYXNlXCI7XG4gICAgfVxuICAgIGNhc2UgXCJjb2RlLWRhdmluY2ktZWRpdC0wMDFcIjpcbiAgICBjYXNlIFwidGV4dC1kYXZpbmNpLWVkaXQtMDAxXCI6IHtcbiAgICAgIHJldHVybiBcInA1MGtfZWRpdFwiO1xuICAgIH1cbiAgICBjYXNlIFwiYWRhXCI6XG4gICAgY2FzZSBcImJhYmJhZ2VcIjpcbiAgICBjYXNlIFwiYmFiYmFnZS0wMDJcIjpcbiAgICBjYXNlIFwiY29kZS1zZWFyY2gtYWRhLWNvZGUtMDAxXCI6XG4gICAgY2FzZSBcImNvZGUtc2VhcmNoLWJhYmJhZ2UtY29kZS0wMDFcIjpcbiAgICBjYXNlIFwiY3VyaWVcIjpcbiAgICBjYXNlIFwiZGF2aW5jaVwiOlxuICAgIGNhc2UgXCJ0ZXh0LWFkYS0wMDFcIjpcbiAgICBjYXNlIFwidGV4dC1iYWJiYWdlLTAwMVwiOlxuICAgIGNhc2UgXCJ0ZXh0LWN1cmllLTAwMVwiOlxuICAgIGNhc2UgXCJ0ZXh0LWRhdmluY2ktMDAxXCI6XG4gICAgY2FzZSBcInRleHQtc2VhcmNoLWFkYS1kb2MtMDAxXCI6XG4gICAgY2FzZSBcInRleHQtc2VhcmNoLWJhYmJhZ2UtZG9jLTAwMVwiOlxuICAgIGNhc2UgXCJ0ZXh0LXNlYXJjaC1jdXJpZS1kb2MtMDAxXCI6XG4gICAgY2FzZSBcInRleHQtc2VhcmNoLWRhdmluY2ktZG9jLTAwMVwiOlxuICAgIGNhc2UgXCJ0ZXh0LXNpbWlsYXJpdHktYWRhLTAwMVwiOlxuICAgIGNhc2UgXCJ0ZXh0LXNpbWlsYXJpdHktYmFiYmFnZS0wMDFcIjpcbiAgICBjYXNlIFwidGV4dC1zaW1pbGFyaXR5LWN1cmllLTAwMVwiOlxuICAgIGNhc2UgXCJ0ZXh0LXNpbWlsYXJpdHktZGF2aW5jaS0wMDFcIjoge1xuICAgICAgcmV0dXJuIFwicjUwa19iYXNlXCI7XG4gICAgfVxuICAgIGNhc2UgXCJncHQtMy41LXR1cmJvLWluc3RydWN0LTA5MTRcIjpcbiAgICBjYXNlIFwiZ3B0LTMuNS10dXJiby1pbnN0cnVjdFwiOlxuICAgIGNhc2UgXCJncHQtMy41LXR1cmJvLTE2ay0wNjEzXCI6XG4gICAgY2FzZSBcImdwdC0zLjUtdHVyYm8tMTZrXCI6XG4gICAgY2FzZSBcImdwdC0zLjUtdHVyYm8tMDYxM1wiOlxuICAgIGNhc2UgXCJncHQtMy41LXR1cmJvLTAzMDFcIjpcbiAgICBjYXNlIFwiZ3B0LTMuNS10dXJib1wiOlxuICAgIGNhc2UgXCJncHQtNC0zMmstMDYxM1wiOlxuICAgIGNhc2UgXCJncHQtNC0zMmstMDMxNFwiOlxuICAgIGNhc2UgXCJncHQtNC0zMmtcIjpcbiAgICBjYXNlIFwiZ3B0LTQtMDYxM1wiOlxuICAgIGNhc2UgXCJncHQtNC0wMzE0XCI6XG4gICAgY2FzZSBcImdwdC00XCI6XG4gICAgY2FzZSBcImdwdC0zLjUtdHVyYm8tMTEwNlwiOlxuICAgIGNhc2UgXCJncHQtMzUtdHVyYm9cIjpcbiAgICBjYXNlIFwiZ3B0LTQtMTEwNi1wcmV2aWV3XCI6XG4gICAgY2FzZSBcImdwdC00LXZpc2lvbi1wcmV2aWV3XCI6XG4gICAgY2FzZSBcImdwdC0zLjUtdHVyYm8tMDEyNVwiOlxuICAgIGNhc2UgXCJncHQtNC10dXJib1wiOlxuICAgIGNhc2UgXCJncHQtNC10dXJiby0yMDI0LTA0LTA5XCI6XG4gICAgY2FzZSBcImdwdC00LXR1cmJvLXByZXZpZXdcIjpcbiAgICBjYXNlIFwiZ3B0LTQtMDEyNS1wcmV2aWV3XCI6XG4gICAgY2FzZSBcInRleHQtZW1iZWRkaW5nLWFkYS0wMDJcIjpcbiAgICBjYXNlIFwidGV4dC1lbWJlZGRpbmctMy1zbWFsbFwiOlxuICAgIGNhc2UgXCJ0ZXh0LWVtYmVkZGluZy0zLWxhcmdlXCI6IHtcbiAgICAgIHJldHVybiBcImNsMTAwa19iYXNlXCI7XG4gICAgfVxuICAgIGNhc2UgXCJncHQtNG9cIjpcbiAgICBjYXNlIFwiZ3B0LTRvLTIwMjQtMDUtMTNcIjpcbiAgICBjYXNlIFwiZ3B0LTRvLTIwMjQtMDgtMDZcIjpcbiAgICBjYXNlIFwiZ3B0LTRvLW1pbmktMjAyNC0wNy0xOFwiOlxuICAgIGNhc2UgXCJncHQtNG8tbWluaVwiOlxuICAgIGNhc2UgXCJvMS0yMDI0LTEyLTE3XCI6XG4gICAgY2FzZSBcIm8xLW1pbmlcIjpcbiAgICBjYXNlIFwibzEtcHJldmlld1wiOlxuICAgIGNhc2UgXCJvMS1wcmV2aWV3LTIwMjQtMDktMTJcIjpcbiAgICBjYXNlIFwibzEtbWluaS0yMDI0LTA5LTEyXCI6XG4gICAgY2FzZSBcImNoYXRncHQtNG8tbGF0ZXN0XCI6XG4gICAgY2FzZSBcImdwdC00by1yZWFsdGltZVwiOlxuICAgIGNhc2UgXCJncHQtNG8tcmVhbHRpbWUtcHJldmlldy0yMDI0LTEwLTAxXCI6IHtcbiAgICAgIHJldHVybiBcIm8yMDBrX2Jhc2VcIjtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gbW9kZWxcIik7XG4gIH1cbn1cblxuZXhwb3J0IHsgVGlrdG9rZW4sIGdldEVuY29kaW5nTmFtZUZvck1vZGVsLCBuZXZlciB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/js-tiktoken@1.0.16/node_modules/js-tiktoken/dist/chunk-3652LHBA.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/js-tiktoken@1.0.16/node_modules/js-tiktoken/dist/lite.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/.pnpm/js-tiktoken@1.0.16/node_modules/js-tiktoken/dist/lite.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Tiktoken: () => (/* reexport safe */ _chunk_3652LHBA_js__WEBPACK_IMPORTED_MODULE_0__.Tiktoken),\n/* harmony export */   getEncodingNameForModel: () => (/* reexport safe */ _chunk_3652LHBA_js__WEBPACK_IMPORTED_MODULE_0__.getEncodingNameForModel)\n/* harmony export */ });\n/* harmony import */ var _chunk_3652LHBA_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-3652LHBA.js */ \"(rsc)/./node_modules/.pnpm/js-tiktoken@1.0.16/node_modules/js-tiktoken/dist/chunk-3652LHBA.js\");\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vanMtdGlrdG9rZW5AMS4wLjE2L25vZGVfbW9kdWxlcy9qcy10aWt0b2tlbi9kaXN0L2xpdGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXdFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGFuZ2NoYWluLW5leHRqcy10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy8ucG5wbS9qcy10aWt0b2tlbkAxLjAuMTYvbm9kZV9tb2R1bGVzL2pzLXRpa3Rva2VuL2Rpc3QvbGl0ZS5qcz83MWMxIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IFRpa3Rva2VuLCBnZXRFbmNvZGluZ05hbWVGb3JNb2RlbCB9IGZyb20gJy4vY2h1bmstMzY1MkxIQkEuanMnO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/js-tiktoken@1.0.16/node_modules/js-tiktoken/dist/lite.js\n");

/***/ })

};
;