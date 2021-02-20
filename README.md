# NodeCreateVideoFromImages **WIP** :muscle:

**If this project has been useful to you and you want to help me to keep contributing to the open source with projects, examples, plugins,... collaborate and buy me a coffee.**

<a href="https://www.buymeacoffee.com/h6WVj4HcD" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" alt="Buy Me A Coffee"></a>

Sample project that shows how to create a video from images.

## Requirements

### Install ffmepg

If you use a MAC

```bash
brew install ffmpeg
```

For other operating systems please consult the official documentation.

## Development server

Run `npm run start:dev` for a dev server. The server will automatically reload if you change any of the source files.

## Testing the creation of a video

To create a video you can use for example POSTMAN to send the following request

[
   {
      "imageName":"1.jpg",
      "loop":1
   },
   {
      "imageName":"2.jpg",
      "loop":2
   },
   {
      "imageName":"3.jpg",
      "loop":3
   },
   {
      "imageName":"4.jpg",
      "loop":4
   },
   {
      "imageName":"5.jpg",
      "loop":5
   },
   {
      "imageName":"6.jpg",
      "loop":6
   },
   {
      "imageName":"7.jpg",
      "loop":7
   },
   {
      "imageName":"8.jpg",
      "loop":8
   },
   {
      "imageName":"9.jpg",
      "loop":9
   },
   {
      "imageName":"10.jpg",
      "loop":10
   }
]
