---
layout: default
title: Exposure Guide
permalink: /xg/
categories: tools
abstract: An iPhone App that allows you to calibrate the darkening effect of your photographic neutral density filters. Exposure Guide has a timer for single und combined filter use.
---
Photographic neutral density filters let you capture pictures that look different - especially if water and sky are essential elements of your composition. The distinct look is achieved by the long exposure times that can be used by leveraging filters like the [LEE Big Stopper](https://youtu.be/JYxc_G12ogM) or Haida ND3.0 filters.

I have written the *Exposure Guide for iPhone* to support this photographic style with a tool to calibrate the darkening effect of neutral density filters.

[![Xg appstore](/assets/appstore.svg)](https://itunes.apple.com/app/exposure-guide/id816163933?mt=8&uo=4)
{:.neutral-link}

Based on the calibration the Exposure Guide calculates the correct exposure for your filters and gives you a timer to count down in seconds.

![Xg timer](/i/xg/xg_timer.jpg){:.LHOP}

The Exposure Guide allows you to combine any or all of your filters in order to calculate the right exposure for your filter combinations.

![Xg filter combi](/i/xg/xg_filter_combi.jpg){:.LHOP}

You do not need conversion tables for your filters anymore. Through the calibration process you get exact customized conversion data for your photographic equipment which will result in correct exposures and better images.

Starting point
--
Photographic neutral densitiy filters allow to take pictures with long exposures. The Lee Big Stopper for example has a darkening effect of 10 f-stops. By leveraging this you can take a picture, that would need an exposure of 1/8 seconds without a filter, with a new exposure of 128 seconds by using the filter.

Every neutral density filter has a production tolerance which results in deviations of the darkening effect. A Big Stopper may have an actual darkening effect of 10.5 f-stops which will lead to an exposure of 181 seconds instead of the theoretical 128 seconds. Achim Sieger is pointing that out in his great [blog post](http://www.achim-sieger.de/en/exposure-calculation-for-the-lee-big-stopper/).

Solution
--
The calibration process allows you to include those production tolerances for each filter that you are using. Because long exposures take long you often can not make many experimental pictures in the essential photographic situation. The Exposure Guide helps you to save valuable time in those moments, because the images you take will have the right exposure from the start.

Calibrate
--
At first you will create an entry for each filter you are using. Those entries simply contain the name of the filter and the darkening effect in f-stops.

Now, when you take long exposures, you will use those entries to let the timer calculate the right exposure. If you notice your pictures being over- or underexposed by using the provided timer values, you need to adjust the f-stop value in the filter entry.

For doing so you can use any of the following two techniques. Each of them requires to take the comparative images under identical light situations!

Technique 1: Use Adobe Lightroom or any software that allows you to correct the exposure of your images
--

![Xg edit filter](/i/xg/xg_edit_filter.jpg){:.LHOP}

Choose your motive and take a properly exposed picture without filter. Keep the exposure of that image in mind.

In the next step you take a picture of the same motive but with your filter. In order to do that, if you have not already a filter entry, create one in the Exposure Guide for the filter you want to use and configure as a starting point the theoretical darkening effect for the filter - e.g. f-stop 10 or ND3.0 for a Lee Big Stopper. Let the Exposure Guide calculate the exposure that is needed for your picture by opening the timer for the filter and selecting the exposure of the image taken before (the one that was taken without filter). The Exposure Guide will calculate the exposure time for your second picture. Take the second picture with the calculated exposure time.

Now you have two images of the same motive. One taken with the filter and one without. Import those two images into Adobe Lightroom and compare the histograms (or use another software which allows to see histograms of your images). Adjust the exposure of the image that was taken with the filter until both histograms look similar. When you are satisfied with the result you can read the correcting f-stop value of the filter image. The f-stop value should be shown somewhere in your software tool.

Now add the correcting f-stop value to the f-stop value of your filter entry in the Exposure Guide. If you have taken, for example, the filter image with a Big Stopper wich has a theoretical f-stop of 10, and you needed to brighten your image by 0.5 f-stops, your new f-stop value will be 10.5. If you needed to darken your image by 0.5 f-stops, your new f-stop value will be 9.5.

Technique 2: Take experimental images by changing the exposure
--

![Xg calibrate filter](/i/xg/xg_calibrate_filter.jpg){:.LHOP}

Again you take a properly exposed image without filter and keep the exposure in mind.

In the next step you take a comparative image of the same motive by using your filter. Let the Exposure Guide determine the needed exposure time.

If the filter image has not the right exposure, you need to take more images while making adjustments to the exposure. Choose a longer exposure if your image is underexposed and choose a shorter exposure when your image is overexposed.

After you have taken an image that has the right exposure you need to open the dialog *Calibrate with exposure times* in the Exposure Guide. Here you choose the exposure of the image that you took without filter and enter the exposure in seconds that you needed for the correct exposed filter image. From these two values the Exposure Guide calculates the f-stop darkening effect of your filter.

Have fun taking pictures!
