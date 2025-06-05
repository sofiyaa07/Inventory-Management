// this is the file that most of the other js files access for info
// will use helper methods to get the array

const serverLocation = `http://localhost:3000`;

export let parts = [
    { name: "Red Wire", model: "Red", location: "1A1", stock: 20, notes: "This one is cool and red", storeLinks: "https://www.amazon.ca/VIABRICO-Electrical-Stranded-Voltage-Extension/dp/B08D6VND2B/ref=sr_1_5?crid=32CD02YZCV9UH&dib=eyJ2IjoiMSJ9.aYGkwNn1K_47hZP9gB01AaDDOrWZ3xQXMVOXR0FP9pkDiFBL-q12LDmF_ai4e_lKxNUmRW2syig1rZPjKda2ko8QU8dB63SUtTgrW3pDh2REsjxEdWmzFhOrPwQOjMfygT4SPLxtEKCsJwLdfKHs1JW9APy3q9kl4_ZV4nfZ48juQQTHftCvf4BkAGCLYKMHfK403rPr9W640JRk3fMCtD303V5n52goRheLcSrratBEA8xLMkdww7alcQYxLtusAIiYmZwT8unXTw_me6s_4zszZ1pSJYlesy32JzKpMV4.JlLSDLIWwZPBqDTQnAhyxZRMCvQq40mBdsPM71cMmok&dib_tag=se&keywords=wire%2Belectric%2Bred&qid=1748435201&sprefix=wire%2Belectric%2Bred%2Caps%2C86&sr=8-5&th=1 | https://www.amazon.ca/GearIT-Gauge-Yellow-Copper-Aluminum/dp/B095BWSSKJ/ref=sr_1_13?crid=2XKGFNXQSNLHX&dib=eyJ2IjoiMSJ9.fYGqqALtUv1-uuvcHoDN2h-dHkZE6LteGwWU4mHsgM7jw1mLemN9bserwngApxt6sRtb7L0qz7-zeU64WryudYyVPCy93daaHiQptdwUuzvZsbO2LLk2qySeBiVzJVpKVw-8VNUoyvlr_mteeIBErQgcDTiYbI3cBT71dpvetMZKoyX_H__yWh0sw2vwiDah1Ma37DmtuS94PJitS4is3sedc8bRJfv-7O_tRQADgjLVbgCI2COLe6tH-ey3iDy7JwFvW8gBepj3sqolGEaXfjABy8rj9EwRgukLYmMTGOI.3IyreFTWsucQVOMmrXnlaqeS3lh9PFOY55tEAXkoXB4&dib_tag=se&keywords=wire&qid=1748959012&sprefix=wir%2Caps%2C99&sr=8-13 | https://www.amazon.ca/Extension-Electrical-Colors-Copper-Aluminum/dp/B08D89WPRP/ref=sr_1_26?crid=2XKGFNXQSNLHX&dib=eyJ2IjoiMSJ9.fYGqqALtUv1-uuvcHoDN2h-dHkZE6LteGwWU4mHsgM7jw1mLemN9bserwngApxt6sRtb7L0qz7-zeU64WryudYyVPCy93daaHiQptdwUuzvZsbO2LLk2qySeBiVzJVpKVw-8VNUoyvlr_mteeIBErQgcDTiYbI3cBT71dpvetMZKoyX_H__yWh0sw2vwiDah1Ma37DmtuS94PJitS4is3sedc8bRJfv-7O_tRQADgjLVbgCI2COLe6tH-ey3iDy7JwFvW8gBepj3sqolGEaXfjABy8rj9EwRgukLYmMTGOI.3IyreFTWsucQVOMmrXnlaqeS3lh9PFOY55tEAXkoXB4&dib_tag=se&keywords=wire&qid=1748959012&sprefix=wir%2Caps%2C99&sr=8-26", imgSrc: "https://m.media-amazon.com/images/I/71FmHA45C9L._SX522_.jpg", threshold: 20 },
    { name: "Blue Wire", model: "Blue", location: "1B1", stock: 1, notes: "This one is not cool and not red", storeLinks: "https://www.amazon.ca/BINNEKER-Gauge-Electric-Stranded-Copper/dp/B0C54XK33L/ref=sr_1_7?crid=3PWD3AIN9MDNP&dib=eyJ2IjoiMSJ9.5wuXIMO3rWVWQdusopF5Qzpy1XkE7A-_2KSYY0NGqhQqpiIPqDVBiYfZZ0tiZya8MW8WsHh6fAw3eGv5K0bu6VVP7Bq6hULirTmVtSVR6QboVdXXKCDHwKyhS3GykzVOOD62IiLoEUx4WPsFrEKRZP6Qq78pSdXCYQm9QTSXFtcFH7dqzbDUUH9E8gBfOwBDe2k_ME2pFhBLU27ycl19mcIEQZRv58VUGXdtFTL9V3lCCx8slJUii1mRoFxb9OCf4K2_kLtJFuWO0VvPlN2FDA1XUiBLokderbAWWe9VZig.1ntAEjJssLtC9KS1sNoewu6x-SJobYDFY1HS8s-Fosk&dib_tag=se&keywords=wire%2Belectric%2Bblue&qid=1748435262&sprefix=wire%2Belectric%2Bblu%2Caps%2C94&sr=8-7&th=1 | https://www.amazon.ca/Tinned-Copper-Automotive-Trailer-Harness/dp/B08HSC5NW5/ref=pd_sbs_d_sccl_4_1/147-0689789-9046562?pd_rd_w=pdvSR&content-id=amzn1.sym.1819d85b-6ab9-4aa1-963d-1c828847dc66&pf_rd_p=1819d85b-6ab9-4aa1-963d-1c828847dc66&pf_rd_r=NFPTXC0Q31RYXEAHJ36Y&pd_rd_wg=te4Qi&pd_rd_r=98ea3127-6bbd-4e89-875a-6beed475d211&pd_rd_i=B08HSC5NW5&th=1 | https://www.amazon.ca/dp/B0BPFMGZTW/ref=sspa_dk_detail_1?pf_rd_p=516c2169-755e-413a-a38a-68230f4ab66f&pf_rd_r=RBEZS9H3702M7QM1B109&pd_rd_wg=OfvfH&pd_rd_w=hudkq&content-id=amzn1.sym.516c2169-755e-413a-a38a-68230f4ab66f&pd_rd_r=dcaa6227-916a-4011-8bb1-f89942e94e64&s=industrial&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw&th=1", imgSrc: "https://m.media-amazon.com/images/I/51x0jgJAneL.__AC_SX300_SY300_QL70_ML2_.jpg", threshold: 20 },
    { name: "Green Wire", model: "Green", location: "1C1", stock: 126, notes: "This one green", storeLinks: "https://www.amazon.ca/BINNEKER-Gauge-Electric-Stranded-Copper/dp/B0C54VYJFW/ref=sr_1_7?crid=2RZZOYM143MQB&dib=eyJ2IjoiMSJ9.o0gxtr7AVGISlkuzyswBUd6OiJKzjq_DBYGpJb7582YKKMxjqqi6PasH0BHUX1JfVSMA-ybPiZqvpltNPLOWY9zxIaBrh1IvQRvrvI9Xvy58bzxLIhPqqllQKczDDkd8IGYDd0LSVbG7lKHK1zUNavpvXFTC7duGFGsBkAOnm0m_9D8c-hBGc0eF2EBZSaIBdX8d6NmC3moFAQfwfS14iv7C6alGF-hO4zO63-zoMlkC8Ujby4sSe5FIGIFhUvibzzWNKgPow6ikobXF_gYwSrtkBlHtCfHHbmgVoVtBieI.pMpqzNwMxVAw_Db8oygQT8DVekAQb8Ce6KdNNJm0cJw&dib_tag=se&keywords=wire%2Belectric%2Bgreen&qid=1748435288&sprefix=wire%2Belectric%2Bgreen%2Caps%2C89&sr=8-7&th=1 | https://www.amazon.ca/dp/B08R3BMPT2/ref=sspa_dk_detail_4?pf_rd_p=516c2169-755e-413a-a38a-68230f4ab66f&pf_rd_r=34WKM5HK4SYKQV88SGN4&pd_rd_wg=yli7c&pd_rd_w=Rbnby&content-id=amzn1.sym.516c2169-755e-413a-a38a-68230f4ab66f&pd_rd_r=65b0db73-27e3-4cbf-85f4-c28b7861ba0c&s=industrial&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw&th=1 | https://www.amazon.ca/Marine-Standard-Automotive-Speakers-Outdoors/dp/B0BG2LKDCN/ref=pd_ci_mcx_di_int_sccai_cn_d_sccl_3_2/147-0689789-9046562?pd_rd_w=UT5bR&content-id=amzn1.sym.d6674fdf-bd00-4d07-8317-6dfd6c498cdf&pf_rd_p=d6674fdf-bd00-4d07-8317-6dfd6c498cdf&pf_rd_r=NR95PNK1Y7QGTQS3Y70F&pd_rd_wg=z703c&pd_rd_r=029f8286-6da7-4509-b053-4688c96e29c2&pd_rd_i=B0BG2LKDCN&th=1", imgSrc: "https://m.media-amazon.com/images/I/61f7KcAWZNL._AC_SX679_.jpg", threshold: 20 },
    { name: "Black Wire", model: "Black", location: "1D1", stock: 23, notes: "This one is black", storeLinks: "https://www.amazon.ca/BINNEKER-Gauge-Electric-Tinned-Copper/dp/B0B19GMLM3/ref=sr_1_30?crid=2CXSCWW5NZPL3&dib=eyJ2IjoiMSJ9.pRoAO8WAGLGZlHChtxCPd_T3ZSZsXyNdkHlpX5zG_4Nj5FMfFXnf0Yxt9gx6YAmWrgwS9UNVuuxOEZb93Rj7aoj9MatmBgyhh0d_vIYb7fqKf0OEtIRzDFnrP8t6WsMacStAeoGKpFLmz0d36me44f3fqUMxiXVm1GKnTY5p7o1asghu41VsoHKVIFAQcPkhh-WmJKyf51e2EWkm19j_FHb0nOCzkAoG1yEZ0pXPuGe-7KlSwHgl9eu2XrPcSJPDzmZU9IsIph1GfBI_AM9XjFUAFubPy9PZ2pwNdllVjj4.J6XReLzhTjkTiLDb9SxluZATJv9U3FVAziuRTLdkMok&dib_tag=se&keywords=wire%2Belectric%2Bblack&qid=1748435309&sprefix=wire%2Belectric%2Bblac%2Caps%2C100&sr=8-30&th=1 | https://www.amazon.ca/dp/B0CKYBSYC3/ref=sspa_dk_hqp_detail_aax_0?psc=1&sp_csd=d2lkZ2V0TmFtZT1zcF9ocXBfc2hhcmVk | https://www.amazon.ca/dp/B0BP1T7R4Y/ref=sspa_dk_detail_0?pd_rd_i=B0BP1T7R4Y&pd_rd_w=6vG8E&content-id=amzn1.sym.516c2169-755e-413a-a38a-68230f4ab66f&pf_rd_p=516c2169-755e-413a-a38a-68230f4ab66f&pf_rd_r=TMXPXZ7YDTJW8ZT8FN2M&pd_rd_wg=ffXsE&pd_rd_r=02a62e11-a474-4766-b9e3-c5f2f905d1f2&s=industrial&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw&th=1", imgSrc: "https://m.media-amazon.com/images/I/51-Cq1fuvzL._AC_SX679_.jpg", threshold: 20 }

];

export let currentPart = { name: "Arduino Uno REV3,ARD_A000088", location: "shelf-8[1][13]", stock: "4" };

export function setCurrentPart(newP) {
    currentPart = newP;
}

// export function getPartArray() {
//     fetch(`${serverLocation}/load`, {
//         // sends the data to the serverLocation
//         method: 'GET',
//         headers: { // i have no idea what this does but i was told to add it
//             'Content-Type': 'application/json'
//         },
//     })
//         .then(response => response.json()) // parses data
//         .then(data => {
//             // data: the part array that was read
//             parts = data;
//             console.log("partArray updated", parts);
//         })
//         // error handling
//         .catch(error => {
//             console.error("Error fetching part array:", error);
//         });

// }