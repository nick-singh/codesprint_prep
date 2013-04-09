package com.graphs.codesprint;

import org.achartengine.ChartFactory;
import org.achartengine.chart.PointStyle;
import org.achartengine.model.XYMultipleSeriesDataset;
import org.achartengine.model.XYSeries;
import org.achartengine.renderer.XYMultipleSeriesRenderer;
import org.achartengine.renderer.XYSeriesRenderer;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;

public class ScatterGraph{
	
	public Intent getIntent(Context context) {
		// Data 1
		int[] x = {2001, 2002, 2003, 2004, 2005, 2006 ,2007, 2008 ,2009, 2010};
		double[] values = {40.0795, 36.1151, 31.4019, 26.0033, 25.0304, 25.7485 ,22.4129, 23 ,22.9, 19.7};
		
		
	    XYSeries series = new XYSeries("Series 1"); 
	    for (int k = 0; k < x.length; k++) {
	    	series.add(x[k], values[k]);
	    }

	    XYMultipleSeriesDataset dataset = new XYMultipleSeriesDataset();
	 	dataset.addSeries(series);
	 	//dataset.addSeries(series2);
	 	
	 	
	    // Customization  for data 1
	    XYSeriesRenderer renderer = new XYSeriesRenderer();
	    renderer.setColor(Color.YELLOW);
	    renderer.setPointStyle(PointStyle.DIAMOND);
	    renderer.setLineWidth(6);
	    
	    // Customization
	    XYMultipleSeriesRenderer mRenderer = new XYMultipleSeriesRenderer();
	    mRenderer.addSeriesRenderer(renderer);	  
	    
	    mRenderer.setApplyBackgroundColor(true);
		mRenderer.setBackgroundColor(Color.BLACK);
	    
	    return ChartFactory.getScatterChartIntent(context, dataset, mRenderer);
	}
	
}
